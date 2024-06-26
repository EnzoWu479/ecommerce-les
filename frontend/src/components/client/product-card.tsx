import Link from 'next/link';
import { Card } from '../ui/card';
import { IProduct } from '@/types/product';
import { formaters } from '@/helpers/formaters';
import { placeholderImage } from '@/lib/placeholderImage';
import { getSellPrice } from '@/utils/getSellPrice';

interface Props {
  product: IProduct;
  index?: number;
}
export const ProductCard = ({ product, index }: Props) => {
  return (
    <Card
      key={product.id}
      data-test={`card-product-${index}`}
      className="group relative"
    >
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          src={placeholderImage({
            preview: product.name
          })}
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
          {formaters.money(product.priceSell)}
        </p>
      </div>
    </Card>
  );
};
