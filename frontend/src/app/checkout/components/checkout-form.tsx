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
import { addressMock } from '@/mock/addressMock';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/features/checkout/store';
import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';

const addresses = addressMock;

export const CheckoutForm = () => {
  const router = useRouter();
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
    100 - infos.payments.reduce((acc, payment) => acc + payment.cut, 0);

  const handleAddPayment = (id: string) => {
    const hasPayment = infos.payments.some(payment => payment.id === id);
    const payment = {
      id: id,
      cut: 0
    };
    setInfos({
      ...infos,
      payments: hasPayment
        ? infos.payments.filter(payment => payment.id !== id)
        : [...infos.payments, payment]
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
  const handleBuy = () => {
    toast.success('Compra realizada com sucesso');
    router.push('/compras');
  };
  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Entrega</CardTitle>
        </CardHeader>
        <CardContent className="flex max-h-32 flex-col gap-2 overflow-auto">
          <RadioGroup
            value={infos.address_id}
            onValueChange={value => setInfos({ ...infos, address_id: value })}
          >
            <div className="max-h-24 space-y-2 overflow-auto">
              {addresses.map((address, index) => (
                <div className="flex items-center gap-2" key={address.id}>
                  <RadioGroupItem
                    value={address.id}
                    data-test={`address-${index + 1}`}
                  />
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      {'Endereço 1'}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      {'Complemento'} <br /> {address.street}, {address.number}{' '}
                      - {'Bairro'} <br /> {address.city.name} - {'Estado'},{' '}
                      {address.zipCode}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
            <Link
              href="/enderecos/cadastrar"
              className="text-sm hover:underline"
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
            {Array.from({ length: 5 }).map((_, index) => {
              const currentPayment = infos.payments.find(
                payment => payment.id === String(index)
              );
              const handleIncrement = () => {
                if (currentPayment) {
                  setInfos({
                    ...infos,
                    payments: infos.payments.map(payment =>
                      payment.id === String(index)
                        ? {
                            ...payment,
                            cut: Math.min(
                              payment.cut + 5,
                              totalMissingPercent > 0
                                ? payment.cut + totalMissingPercent
                                : payment.cut
                            )
                          }
                        : payment
                    )
                  });
                }
              };
              const handleDecrement = () => {
                if (currentPayment) {
                  setInfos({
                    ...infos,
                    payments: infos.payments.map(payment =>
                      payment.id === String(index)
                        ? { ...payment, cut: Math.max(0, payment.cut - 5) }
                        : payment
                    )
                  });
                }
              };
              const priceInReal =
                (totalPrice * (currentPayment?.cut || 0)) / 100;
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
                      onClick={() => handleAddPayment(String(index))}
                    />
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer hover:underline">
                        Cartão 1
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        **** **** **** 1121 <br /> 12/24 <br /> John Doe
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  {currentPayment && (
                    <InputValueControl
                      value={currentPayment?.cut || 0}
                      tooltip={
                        priceInReal ? String(formaters.money(priceInReal)) : ''
                      }
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Link
            href="/cartoes-de-credito/cadastrar"
            className="text-sm hover:underline"
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
        <Button onClick={handleBuy} data-test="buy-button">Comprar</Button>
      </div>
    </div>
  );
};
