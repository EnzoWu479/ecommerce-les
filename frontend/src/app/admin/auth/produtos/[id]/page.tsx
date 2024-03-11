import { ClientForm } from '@/components/admin/client/client-form';
import { ProductForm } from '@/components/admin/product-form';
import { GoBackButton } from '@/components/go-back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RegisterProductPage = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Editar produto</h2>
      </div>
      <div className="mt-2">
        <ProductForm />
      </div>
    </>
  );
};
export default RegisterProductPage;