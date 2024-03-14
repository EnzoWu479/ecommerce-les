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
import { productsMock } from '@/mock/productsMock';
import { CheckoutForm } from './components/checkout-form';

const productsChoosen = productsMock.filter((_, index) => index < 3);

const CheckoutPage = () => {
  const totalPrice = productsChoosen.reduce(
    (acc, product) => acc + product.price,
    0
  );
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
                  {productsChoosen.map(product => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={product.id}
                    >
                      <div className="flex w-[50%] items-center">
                        <img
                          alt="Thumbnail"
                          className="aspect-square overflow-hidden rounded-md object-cover"
                          height="100"
                          src={product.imageSrc}
                          width="100"
                        />
                        <div className="ml-4 grid gap-1 leading-none">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {product.author}
                          </div>
                        </div>
                      </div>
                      <div className="w-6 text-center">x1</div>
                      <div className="w-20 text-right">
                        {formaters.money(product.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col">
                <Separator />
                <div className="flex w-full items-center justify-between gap-4 pt-2 font-medium">
                  <div>Total</div>
                  <div className="text-right">
                    {formaters.money(totalPrice)}
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
};
export default CheckoutPage;
