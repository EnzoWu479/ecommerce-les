import { ClientForm } from '@/components/client-form';
import { ProductForm } from '@/components/admin/product-form';
import { GoBackButton } from '@/components/go-back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categoryData } from '@/services/data/category';
import { Suspense } from 'react';
import { priceGroupData } from '@/services/data/priceGroup';

const FormWithCategories = async () => {
  const [categories, priceGroups] = await Promise.all([
    categoryData.getAll(),
    priceGroupData.getAll()
  ]);
  return <ProductForm categories={categories} priceGroups={priceGroups} />;
};

const RegisterProductPage = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Cadastrar produto</h2>
      </div>
      <div className="mt-2">
        <Suspense fallback="Loading">
          <FormWithCategories />
        </Suspense>
      </div>
    </>
  );
};
export default RegisterProductPage;
