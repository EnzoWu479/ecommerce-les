import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Minus, Percent, Plus, Trash } from 'lucide-react';
import { InputValueControl } from '@/components/input-value-control';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formaters } from '@/helpers/formaters';

const CheckoutPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">Checkout</h2>
      <div className="grid min-h-96 items-start  gap-6 md:grid-cols-2 lg:gap-12">
        <div className="h-full">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <div className="flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center">
                      <img
                        alt="Thumbnail"
                        className="aspect-square overflow-hidden rounded-md object-cover"
                        height="100"
                        src="/placeholder.svg"
                        width="100"
                      />
                      <div className="ml-4 grid gap-1 leading-none">
                        <div className="font-medium">T-Shirt</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: 123456
                        </div>
                      </div>
                    </div>
                    <div className="text-center">x1</div>
                    <div className="text-right">$99.00</div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center">
                      <img
                        alt="Thumbnail"
                        className="aspect-square overflow-hidden rounded-md object-cover"
                        height="100"
                        src="/placeholder.svg"
                        width="100"
                      />
                      <div className="ml-4 grid gap-1 leading-none">
                        <div className="font-medium">Hoodie</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: 123457
                        </div>
                      </div>
                    </div>
                    <div className="text-center">x1</div>
                    <div className="text-right">$99.00</div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center">
                      <img
                        alt="Thumbnail"
                        className="aspect-square overflow-hidden rounded-md object-cover"
                        height="100"
                        src="/placeholder.svg"
                        width="100"
                      />
                      <div className="ml-4 grid gap-1 leading-none">
                        <div className="font-medium">Socks</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: 123458
                        </div>
                      </div>
                    </div>
                    <div className="text-center">x2</div>
                    <div className="text-right">$20.00</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col">
                <div className="flex w-full items-center justify-between gap-4">
                  <div>Subtotal</div>
                  <div className="text-right">$217.00</div>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <div>Shipping</div>
                  <div className="text-right">$10.00</div>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <div>Tax</div>
                  <div className="text-right">$21.70</div>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between gap-4 font-medium">
                  <div>Total</div>
                  <div className="text-right">$248.70</div>
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
              <RadioGroup>
                <div className="max-h-24 space-y-2 overflow-auto">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="address-1" />
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer hover:underline">
                        Endereço 1
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        Estacionamento <br /> Av. Armando Salles de Oliveira,
                        1200 - Parque Suzano <br /> Suzano - SP, 08673-000
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="address-2" />
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer hover:underline">
                        Endereço 1
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        Estacionamento <br /> Av. Armando Salles de Oliveira,
                        1200 - Parque Suzano <br /> Suzano - SP, 08673-000
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <Link href="/enderecos/cadastrar" className="text-sm hover:underline">
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
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      Cartão 1
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      **** **** **** 1121 <br /> 12/24 <br /> John Doe
                    </HoverCardContent>
                  </HoverCard>
                  <InputValueControl value={50} tooltip={'R$ 50,00'} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      Cartão 1
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      **** **** **** 1121 <br /> 12/24 <br /> John Doe
                    </HoverCardContent>
                  </HoverCard>
                  <InputValueControl value={50} tooltip={'R$ 50,00'} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      Cartão 1
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      **** **** **** 1121 <br /> 12/24 <br /> John Doe
                    </HoverCardContent>
                  </HoverCard>
                  <InputValueControl value={50} tooltip={'R$ 50,00'} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      Cartão 1
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      **** **** **** 1121 <br /> 12/24 <br /> John Doe
                    </HoverCardContent>
                  </HoverCard>
                  <InputValueControl value={50} tooltip={'R$ 50,00'} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      Cartão 1
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      **** **** **** 1121 <br /> 12/24 <br /> John Doe
                    </HoverCardContent>
                  </HoverCard>
                  <InputValueControl value={50} tooltip={'R$ 50,00'} />
                </div>
              </div>
              <Link href="/cartoes-de-credito/cadastrar" className="text-sm hover:underline">
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
                          <span className="text-sm">
                            - {formaters.money(10)}
                          </span>
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
                          <span className="text-sm">
                            - {formaters.money(10)}
                          </span>
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
                          <span className="text-sm">
                            - {formaters.money(10)}
                          </span>
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
                          <span className="text-sm">
                            - {formaters.money(10)}
                          </span>
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
                <Button>Adicionar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/" replace>
            Voltar
          </Link>
        </Button>
        <Button>Comprar</Button>
      </div>
    </div>
  );
};
export default CheckoutPage;
