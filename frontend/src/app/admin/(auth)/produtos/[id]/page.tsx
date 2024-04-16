import { ClientForm } from '@/components/client-form';
import { ProductForm } from '@/components/admin/product-form';
import { GoBackButton } from '@/components/go-back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categoryData } from '@/services/data/category';
import { priceGroupData } from '@/services/data/priceGroup';
import { productData } from '@/services/data/product';

interface Params {
  id: string;
}

const FormWithCategories = async ({ id }: Params) => {
  const [categories, priceGroups, product] = await Promise.all([
    categoryData.getAll(),
    priceGroupData.getAll(),
    productData.get(id)
  ]);
  return (
    <ProductForm
      categories={categories}
      priceGroups={priceGroups}
      product={product}
    />
  );
};

const RegisterProductPage = ({ params: { id } }: { params: Params }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Editar produto</h2>
      </div>
      <div className="mt-2">
        <FormWithCategories id={id} />
      </div>
    </>
  );
};
export default RegisterProductPage;
