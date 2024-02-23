'use client';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { useBagStore } from '@/features/bag/store';
import { ClientLayout } from '@/layouts/client-layout';
import { formaters } from '@/helpers/formaters';
import { Button } from '@/components/ui/button';
import { InputValueControl } from '@/components/input-value-control';

export default function Example() {
  const { addProduct } = useBagStore();

  const [quantity, setQuantity] = useState(1);

  return (
    <ClientLayout>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={'/assets/book-1.webp'}
                alt={'/assets/book-1.webp'}
                className="h-96 w-full object-contain object-center"
              />
            </div>
            <div className="col-span-2">
              <div className="mt-4 space-y-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Harry Potter and the Philosopher's Stone
                </h1>

                <p className="text-base text-gray-900">
                  Harry retorna para seu quarto ano na Escola de Magia e
                  Bruxaria de Hogwarts, junto com os seus amigos Ron e Hermione.
                  Desta vez, acontece um torneio entre as três maiores escola de
                  magia, com um participante selecionado de cada escola, pelo
                  Cálice de Fogo. O nome de Harry aparece, mesmo não tendo se
                  inscrito, e ele precisa competir.
                </p>
                <div>
                  <span className="font-bold">Categorias</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex rounded-full border px-2 py-1 text-xs">
                      Fantasia
                    </span>
                    <span className="flex rounded-full border px-2 py-1 text-xs">
                      Infantil
                    </span>
                  </div>
                </div>
                <p className="text-3xl tracking-tight text-gray-900">
                  {formaters.money(39.99)}
                </p>
                <div className='flex gap-4'>
                  <InputValueControl
                    value={quantity}
                    tooltip={`${quantity}`}
                    onIncrement={() => setQuantity(prev => prev + 1)}
                    onDecrement={() =>
                      setQuantity(prev => Math.max(prev - 1, 1))
                    }
                  />
                  <Button>Comprar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
