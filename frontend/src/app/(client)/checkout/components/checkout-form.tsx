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

export const CheckoutForm = () => {
  const router = useRouter();
  const { data: addresses } = useQueryDeliveryAddress();
  const { data: creditCards } = useQueryCreditCardUnlist();
  console.log(creditCards);

  const { infos, setInfos, clearInfos } = useCheckoutStore();
  const [coupomInput, setCoupomInput] = useState('');
  const [coupons, setCoupons] = useState<
    {
      code: string;
      id: string;
    }[]
  >([]);
  const totalPrice = 499.99;
  const totalMissingPercent =
    100 - infos.cards.reduce((acc, payment) => acc + payment.percent, 0);

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
  const handleAddCoupom = (event: FormEvent) => {
    event.preventDefault();
    setCoupons(prev => [
      ...prev,
      {
        code: coupomInput,
        id: crypto.randomUUID()
      }
    ]);
    setCoupomInput('');
    toast.success('Cupom adicionado com sucesso');
  };
  const handleDeleteCoupom = (id: string) => {
    setCoupons(prev => prev.filter(coupom => coupom.id !== id));
  };
  const isDisabled =
    !infos.addressId || infos.cards.length <= 0 || totalMissingPercent > 0;
  const handleBuy = async () => {
    try {
      await purchaseData.purchase(infos);
      toast.success('Compra realizada com sucesso');
      router.push('/compras');
    } catch (error) {
      toast.error('Erro ao realizar compra');
    }
  };
  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Entrega</CardTitle>
        </CardHeader>
        <CardContent className="flex max-h-32 flex-col gap-2 overflow-auto">
          <RadioGroup
            value={infos.addressId}
            onValueChange={value => setInfos({ ...infos, addressId: value })}
          >
            <div className="max-h-24 space-y-2 overflow-auto">
              {addresses?.map((address, index) => (
                <div className="flex items-center gap-2" key={address.id}>
                  <RadioGroupItem
                    value={address.address.id}
                    data-test={`address-${index + 1}`}
                  />
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      {address.name}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      {address.address.street}, {address.address.number} -{' '}
                      {address.address.neighborhood} <br />{' '}
                      {address.address.city.name} -{' '}
                      {address.address.city.state.uf},{' '}
                      {masks.zipcode(address.address.zipCode)}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
            <Link
              href="/enderecos/cadastrar"
              className="text-sm hover:underline"
              data-test="add-address"
            >
              Adicionar Endereço
            </Link>
          </RadioGroup>
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
                        priceInReal ? String(formaters.money(priceInReal)) : ''
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-sm">- {formaters.money(10)}</span>
                      </TooltipTrigger>
                      <TooltipContent>50%</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
          <form onSubmit={handleAddCoupom}>
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
  );
};
