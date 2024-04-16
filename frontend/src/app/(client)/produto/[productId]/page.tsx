import { Suspense } from 'react';
import { ClientLayout } from '@/components/layouts/client-layout';
import { productData } from '@/services/data/product';
import { ProductPage } from './product-page';

interface Props {
  productId: string;
}
const FetchProduct = async ({ productId }: Props) => {
  const product = await productData.get(productId);
  return <ProductPage product={product} />;
};

export default function Product({ params: { productId } }: { params: Props }) {
  return (
    <ClientLayout>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <Suspense fallback="Loading">
            <FetchProduct productId={productId} />
          </Suspense>
        </div>
      </div>
    </ClientLayout>
  );
}
