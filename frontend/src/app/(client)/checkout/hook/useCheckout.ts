import { useCart } from '@/features/bag/useCart';
import { useCheckoutStore } from '@/features/checkout/store';
import { PurchaseCardSchema } from '@/server/validations/purchase.schema';
import { couponData } from '@/services/data/coupon';
import { purchaseData } from '@/services/data/purchase';
import { useQueryDeliveryAddress } from '@/services/query/useQueryAddress';
import { useQueryCreditCardUnlist } from '@/services/query/useQueryCreditCard';
import { ICoupon } from '@/types/coupon';
import { getShippingValue } from '@/utils/getShippingValue';
import { CouponType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

export const useCheckout = () => {
  const router = useRouter();

  const { infos, setInfos, clearInfos } = useCheckoutStore();
  const { total } = useCart();
  const { coupons } = infos;

  const totalDiscount = coupons.reduce((acc, coupon) => acc + coupon.value, 0);

  const shippingValue = infos.addressId ? getShippingValue() : 0;
  const totalPrice = total + shippingValue - totalDiscount;

  const totalMissingPercent =
    totalDiscount < total
      ? 100 - infos.cards.reduce((acc, payment) => acc + payment.percent, 0)
      : 0;

  const handleAddPayment = (id: string) => {
    const hasPayment = infos.cards.some(payment => payment.cardId === id);
    const payment: PurchaseCardSchema = {
      cardId: id,
      percent: 0
    };
    setInfos({
      ...infos,
      cards: hasPayment
        ? infos.cards.filter(payment => payment.cardId !== id)
        : [...infos.cards, payment]
    });
  };
  const handleAddCoupom = async (code: string) => {
    try {
      const hasPromotional = coupons.some(
        coupom => coupom.type === CouponType.PROMOTIONAL
      );
      const coupon = await couponData.getByCode(code);

      if (coupons.some(coupom => coupom.id === coupon.id)) {
        throw new Error('Cupom já adicionado');
      }
      if (hasPromotional && coupon.type === CouponType.PROMOTIONAL) {
        throw new Error('Já existe um cupom promocional aplicado');
      }
      console.log(coupon.expiresAt, new Date());

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        throw new Error('Cupom expirado');
      }
      setInfos({
        ...infos,
        coupons: [
          ...infos.coupons,
          {
            ...coupon,
            createdAt: coupon.createdAt as string,
            updatedAt: coupon.updatedAt as string,
            expiresAt: coupon.expiresAt as string
          }
        ]
      });
      toast.success('Cupom adicionado com sucesso');
      return true;
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Cupom inválido');
      }
      return false;
    }
  };
  const handleDeleteCoupom = (id: string) => {
    setInfos({
      ...infos,
      coupons: infos.coupons.filter(coupom => coupom.id !== id)
    });
  };

  const isDisabled = !infos.addressId || totalMissingPercent > 0;
  const handleBuy = async () => {
    try {
      for (const payment of infos.cards) {
        if (payment.percent === 0) {
          toast.error('Por favor, selecione a porcentagem de cada cartão');
          return;
        }
        if (totalPrice * (payment.percent / 100) < 10) {
          toast.error('O valor mínimo por cartão é de R$ 10,00');
          return;
        }
      }
      await purchaseData.purchase(infos);
      clearInfos();
      toast.success('Compra realizada com sucesso');
      router.push('/compras');
    } catch (error) {
      toast.error('Erro ao realizar compra');
    }
  };
  return {
    handleAddPayment,
    handleAddCoupom,
    handleDeleteCoupom,
    handleBuy,
    isDisabled,
    totalPrice,
    totalDiscount,
    totalMissingPercent,
    shippingValue,
    infos,
    setInfos,
    coupons
  };
};
