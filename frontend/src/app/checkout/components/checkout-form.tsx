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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const addresses = addressMock;

export const CheckoutForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const handleAddCoupom = () => {
    toast({
      title: 'Cupom adicionado com sucesso',
      description: 'O seu cupom foi adicionado'
    });
  };
  const handleBuy = () => {
    toast({
      title: 'Compra realizada com sucesso',
      description: 'A sua compra foi realizada'
    });
    router.push('/compras');
  };
  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Entrega</CardTitle>
        </CardHeader>
        <CardContent className="flex max-h-32 flex-col gap-2 overflow-auto">
          <RadioGroup>
            <div className="max-h-24 space-y-2 overflow-auto">
              {addresses.map(address => (
                <div className="flex items-center gap-2" key={address.id}>
                  <RadioGroupItem value={address.id} />
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      {address.name}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      {address.complement} <br /> {address.street},{' '}
                      {address.number} - {address.neighborhood} <br />{' '}
                      {address.city.name} - {address.city.state.name},{' '}
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
          <button type="button" className="rounded-sm border p-1">
            <Percent size={16} />
          </button>
        </CardHeader>
        <CardContent>
          <div className="max-h-24 space-y-2 overflow-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox checked />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={50} tooltip={'R$ 50,00'} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox checked />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={25} tooltip={'R$ 25,00'} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox checked />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={25} tooltip={'R$ 25,00'} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={0} tooltip={'R$ 0,00'} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={0} tooltip={'R$ 0,00'} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Cartão 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    **** **** **** 1121 <br /> 12/24 <br /> John Doe
                  </HoverCardContent>
                </HoverCard>
              </div>
              <InputValueControl value={0} tooltip={'R$ 0,00'} />
            </div>
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
            <div className="flex items-center justify-between gap-2">
              <span>VIOLET50</span>
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
                      <Trash size={16} />
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>VIOLET50</span>
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
                      <Trash size={16} />
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>VIOLET50</span>
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
                      <Trash size={16} />
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>VIOLET50</span>
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
                      <Trash size={16} />
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Digite o código do cupom" />
            <Button onClick={handleAddCoupom}>Adicionar</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/" replace>
            Voltar
          </Link>
        </Button>
        <Button onClick={handleBuy}>Comprar</Button>
      </div>
    </div>
  );
};
