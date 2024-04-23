'use client';
import { InputValueControl } from '@/components/input-value-control';
import { Button } from '@/components/ui/button';
import { productData } from '@/services/data/product';
import { useCart } from '@/features/bag/useCart';
import { formaters } from '@/helpers/formaters';
import { placeholderImage } from '@/lib/placeholderImage';
import { IProduct } from '@/types/product';
import { getSellPrice } from '@/utils/getSellPrice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: IProduct;
}

export const ProductPage = ({ product }: Props) => {
  const router = useRouter();
  const { cart, addProductToCart } = useCart();

  const cartHasProduct = cart?.productCart.find(
    productCart => productCart.bookId === product.id
  );

  const [quantity, setQuantity] = useState(product.stock.quantity > 0 ? 1 : 0);
  const [loading, setLoading] = useState(false);

  const handleAddToBag = async () => {
    // addProduct();
    try {
      setLoading(true);
      await addProductToCart(product.id, quantity);
      toast.success('Produto adicionado ao carrinho');
      router.back();
    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho');
    }
  };
  console.log(product.stock.quantity);

  useEffect(() => {
    if (cartHasProduct) {
      setQuantity(cartHasProduct.amount);
    }
  }, [cart]);
  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-4 px-4 sm:px-6 lg:max-w-7xl lg:gap-x-8">
      <div className="space-y-4  lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src={placeholderImage({
              preview: product.name
            })}
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

            <p className="text-base text-gray-900">{product.synopsis}</p>
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
              {formaters.money(product.priceSell)}
            </p>
            <div className="flex gap-4" data-test="change-quantity">
              <InputValueControl
                value={quantity}
                tooltip={`${quantity}`}
                onChange={(value: number) => {
                  setQuantity(value);
                }}
                max={product.stock.quantity}
              />
              <Button
                data-test="add-product-button"
                onClick={handleAddToBag}
                disabled={loading || quantity === 0}
              >
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
            <div>{product.numberPages} páginas</div>
          </div>
          <div>
            <span className="font-bold">Tamanho</span>
            <div>{`${product.width}cm x ${product.height}cm x ${product.depth}cm`}</div>
          </div>
          <div>
            <span className="font-bold">Peso</span>
            <div>{product.weight}kg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
