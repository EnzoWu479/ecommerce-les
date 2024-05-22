'use client';

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import Link from 'next/link';
import { Percent, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { InputValueControl } from '@/components/input-value-control';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formaters } from '@/helpers/formaters';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/features/checkout/store';
import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { useQueryDeliveryAddress } from '@/services/query/useQueryAddress';
import { masks } from '@/helpers/masks';
import { useQueryCreditCardUnlist } from '@/services/query/useQueryCreditCard';
import { PurchaseCardSchema } from '@/server/validations/purchase.schema';
import { purchaseData } from '@/services/data/purchase';
import { ICoupon } from '@/types/coupon';
import { couponData } from '@/services/data/coupon';
import { CouponType } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { placeholderImage } from '@/lib/placeholderImage';
import { useCart } from '@/features/bag/useCart';
import { useCheckout } from '../hook/useCheckout';
import { AddressList } from './address-list';

export const CheckoutForm = () => {
  const router = useRouter();

  const { data: addresses } = useQueryDeliveryAddress();
  const { data: creditCards } = useQueryCreditCardUnlist();
  const { cart, total } = useCart();
  const [coupomInput, setCoupomInput] = useState('');

  console.log(creditCards);
  const {
    coupons,
    handleAddCoupom,
    handleAddPayment,
    handleBuy,
    handleDeleteCoupom,
    infos,
    isDisabled,
    setInfos,
    shippingValue,
    totalMissingPercent,
    totalDiscount,
    totalPrice
  } = useCheckout();

  const onAddCoupon = async (event: FormEvent) => {
    event.preventDefault();

    const ok = await handleAddCoupom(coupomInput);
    if (ok) {
      setCoupomInput('');
    }
  };
  return (
    <div className="grid min-h-96 items-start  gap-6 md:grid-cols-2 lg:gap-12">
      <div className="h-full">
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <div className="flex flex-col justify-between">
            <CardContent>
              <div className="flex flex-col gap-4">
                {cart?.productCart.map(product => (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={product.id}
                  >
                    <div className="flex w-[50%] items-center">
                      <img
                        alt="Thumbnail"
                        className="aspect-square overflow-hidden rounded-md object-cover"
                        height="100"
                        src={placeholderImage({
                          preview: product.book.name
                        })}
                        width="100"
                      />
                      <div className="ml-4 grid gap-1 leading-none">
                        <div className="font-medium">{product.book.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.book.author}
                        </div>
                      </div>
                    </div>
                    <div className="w-6 text-center">x{product.amount}</div>
                    <div className="w-20 text-right">
                      {formaters.money(product.book.priceSell)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col">
              <Separator />
              <div className="flex w-full items-center justify-between gap-4 pt-2 font-medium">
                <div>Subtotal</div>
                <div className="text-right">{formaters.money(total || 0)}</div>
              </div>
              {shippingValue !== 0 && (
                <div className="flex w-full items-center justify-between gap-4 pt-2 font-medium">
                  <div>Frete</div>
                  <div className="text-right">
                    {formaters.money(shippingValue || 0)}
                  </div>
                </div>
              )}
              {totalDiscount > 0 && (
                <div className="flex w-full items-center justify-between gap-4 pt-2 font-medium">
                  <div>Desconto</div>
                  <div className="text-right">
                    - {formaters.money(totalDiscount || 0)}
                  </div>
                </div>
              )}
              <Separator className="mt-2" />
              <div className="flex w-full items-center justify-between gap-4 pt-2 font-medium">
                <div>Total</div>
                <div className="text-right">
                  {formaters.money(totalPrice || 0)}
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className="flex h-full flex-col justify-between space-y-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Entrega</CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-32 flex-col gap-2 overflow-auto">
            <AddressList
              addresses={addresses || []}
              value={infos.addressId}
              onChange={value => setInfos({ ...infos, addressId: value })}
            />
            <Link
              href="/enderecos/cadastrar"
              className="text-sm hover:underline"
              data-test="add-address"
            >
              Adicionar Endereço
            </Link>
          </CardContent>
        </Card>
        <Card className="mt-4 h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pagamento</CardTitle>
            <div className="flex items-center gap-2">
              {totalMissingPercent > 0 && (
                <span className="text-red-600">{totalMissingPercent}%</span>
              )}
              <button type="button" className="rounded-sm border p-1">
                <Percent size={16} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-24 space-y-2 overflow-auto">
              {creditCards?.map((card, index) => {
                const currentPayment = infos.cards.find(
                  payment => payment.cardId === card.id
                );
                const handleChange = (value: number) => {
                  if (currentPayment) {
                    const newPayment = [...infos.cards];
                    newPayment[newPayment.indexOf(currentPayment)] = {
                      ...currentPayment,
                      percent: value
                    };
                    setInfos({
                      ...infos,
                      cards: newPayment
                    });
                  }
                };
                const value = currentPayment?.percent || 0;
                const priceInReal =
                  (totalPrice * (currentPayment?.percent || 0)) / 100;
                return (
                  <div
                    className="flex items-center justify-between gap-2"
                    key={index}
                    data-test={`payment-${index + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={!!currentPayment}
                        data-test="checkbox"
                        onClick={() => handleAddPayment(card.id)}
                      />
                      <HoverCard>
                        <HoverCardTrigger className="cursor-pointer hover:underline">
                          {card.name}
                        </HoverCardTrigger>
                        <HoverCardContent className="text-sm">
                          **** **** ****{' '}
                          {card.number.slice(card.number.length - 4)} <br />{' '}
                          {formaters.date(card.expDate, 'MM/YY')} <br />{' '}
                          {card.holderName}
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    {currentPayment && (
                      <InputValueControl
                        value={value}
                        tooltip={
                          priceInReal
                            ? String(formaters.money(priceInReal))
                            : ''
                        }
                        onChange={handleChange}
                        step={5}
                        max={value + totalMissingPercent}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              href="/cartoes-de-credito/cadastrar"
              className="text-sm hover:underline"
              data-test="add-payment"
            >
              Adicionar cartão
            </Link>
          </CardContent>
        </Card>
        <Card className="mt-4 h-full">
          <CardHeader>
            <CardTitle>Cupons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="max-h-24 space-y-2 overflow-auto">
              {coupons.map((coupom, index) => (
                <div
                  className="flex items-center justify-between gap-2"
                  key={coupom.id}
                >
                  <span>{coupom.code}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">
                      - {formaters.money(coupom.value)}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <button
                            type="button"
                            onClick={() => handleDeleteCoupom(coupom.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Deletar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={onAddCoupon}>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código do cupom"
                  data-test="coupom-input"
                  value={coupomInput}
                  onChange={e => setCoupomInput(e.target.value)}
                />
                <Button type="submit" data-test="coupom-submit">
                  Adicionar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/" replace>
              Voltar
            </Link>
          </Button>
          <Button
            onClick={handleBuy}
            data-test="buy-button"
            disabled={isDisabled}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};
