import { Card } from '../ui/card';

const product = {
  id: 1,
  name: 'Harry Potter',
  href: '#',
  imageSrc: '/assets/book-1.webp',
  imageAlt: "Front of men's Basic Tee in black.",
  price: '$35',
  color: 'Black'
};

export const ProductCard = () => {
  return (
    <Card key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-2 flex justify-between p-2">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </Card>
  );
};
