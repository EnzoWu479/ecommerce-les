'use client';
import { use, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { useBagStore } from '@/features/bag/store';
import { ClientLayout } from '@/layouts/client-layout';
import { formaters } from '@/helpers/formaters';
import { Button } from '@/components/ui/button';
import { InputValueControl } from '@/components/input-value-control';
import { getProduct } from '@/data/get-product';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  productId: string;
}
export default function ProductPage({
  params: { productId }
}: {
  params: Props;
}) {
  const product = getProduct(productId);
  const router = useRouter();
  const { addProduct } = useBagStore();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const handleAddToBag = () => {
    addProduct();
    toast({
      title: 'Produto adicionado ao carrinho',
      description: 'O produto foi adicionado ao carrinho com sucesso',
      duration: 3000
    });
    router.back();
  };

  return (
    <ClientLayout>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl space-y-4 px-4 sm:px-6 lg:max-w-7xl lg:gap-x-8">
            <div className="space-y-4  lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-96 w-full object-contain object-center"
                />
              </div>
              <div className="col-span-2">
                <div className="mt-4 space-y-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>

                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                  <div>
                    <span className="font-bold">Categorias</span>
                    <div className="flex flex-wrap gap-2">
                      {product.categories.map(category => (
                        <span
                          key={category.id}
                          className="flex rounded-full border px-2 py-1 text-xs"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-3xl tracking-tight text-gray-900">
                    {formaters.money(product.price)}
                  </p>
                  <div className="flex gap-4">
                    <InputValueControl
                      value={quantity}
                      tooltip={`${quantity}`}
                      onIncrement={() => setQuantity(prev => prev + 1)}
                      onDecrement={() =>
                        setQuantity(prev => Math.max(prev - 1, 1))
                      }
                    />
                    <Button onClick={handleAddToBag}>
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Detalhes</h2>
              <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:w-full lg:grid-cols-3">
                <div>
                  <span className="font-bold">Autor</span>
                  <div>{product.author}</div>
                </div>
                <div>
                  <span className="font-bold">Ano</span>
                  <div>{product.year}</div>
                </div>
                <div>
                  <span className="font-bold">Editora</span>
                  <div>{product.publisher}</div>
                </div>
                <div>
                  <span className="font-bold">Edição</span>
                  <div>{product.edition}</div>
                </div>
                <div>
                  <span className="font-bold">isbn</span>
                  <div>{product.isbn}</div>
                </div>
                <div>
                  <span className="font-bold">Número de páginas</span>
                  <div>{product.numberOfPages} páginas</div>
                </div>
                <div>
                  <span className="font-bold">Tamanho</span>
                  <div>{`${product.dimensions.width}cm x ${product.dimensions.height}cm x ${product.dimensions.depth}cm`}</div>
                </div>
                <div>
                  <span className="font-bold">Peso</span>
                  <div>{product.dimensions.weight}kg</div>
                </div>
                <div>
                  <span className="font-bold">Peso</span>
                  <div>{product.dimensions.weight}kg</div>
                </div>
                <div>
                  <span className="font-bold">Número de páginas</span>
                  <div>{product.numberOfPages} páginas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
