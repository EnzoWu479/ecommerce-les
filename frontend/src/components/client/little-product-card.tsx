import Link from 'next/link';
import { Card } from '../ui/card';
import { IProduct } from '@/types/product';
import { formaters } from '@/helpers/formaters';
import { placeholderImage } from '@/lib/placeholderImage';
import { getSellPrice } from '@/utils/getSellPrice';
import { getFirstLetterOfPhase } from '@/utils/getFirstLetterOfPhase';

interface Props {
  product: IProduct;
  index?: number;
}
export const LittleProductCard = ({ product, index }: Props) => {
  return (
    <Card
      key={product.id}
      data-test={`card-product-${index}`}
      className="group relative flex gap-2 p-2"
    >
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none h-16 w-16 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <img
          src={placeholderImage({
            preview: getFirstLetterOfPhase(product.name)
          })}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-col justify-between">
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
