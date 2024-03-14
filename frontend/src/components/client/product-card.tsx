import Link from 'next/link';
import { Card } from '../ui/card';
import { IProduct } from '@/types/product';
import { formaters } from '@/helpers/formaters';

interface Props {
  product: IProduct;
}
export const ProductCard = ({ product }: Props) => {
  return (
    <Card key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-2 flex justify-between p-2">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/produto/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formaters.money(product.price)}
        </p>
      </div>
    </Card>
  );
};
