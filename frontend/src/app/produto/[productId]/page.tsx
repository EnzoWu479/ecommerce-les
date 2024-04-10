'use client';
import { Suspense, use, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { useBagStore } from '@/features/bag/store';
import { ClientLayout } from '@/components/layouts/client-layout';
import { formaters } from '@/helpers/formaters';
import { Button } from '@/components/ui/button';
import { InputValueControl } from '@/components/input-value-control';
import { getProduct } from '@/data/get-product';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { productData } from '@/data/product';
import { ProductPage } from './product-page';

interface Props {
  productId: string;
}
const FetchProduct = async ({ productId }: Props) => {
  const product = await productData.get(productId);
  return <ProductPage product={product} />;
};

export default function Product({ params: { productId } }: { params: Props }) {
  const router = useRouter();
  // const { addProduct } = useBagStore();
  const [quantity, setQuantity] = useState(1);
  const handleAddToBag = () => {
    // addProduct();
    toast.success('Produto adicionado ao carrinho');
    router.back();
  };

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
