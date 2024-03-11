import { CategoryForm } from '@/components/admin/category-form';
import { GoBackButton } from '@/components/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterCategory = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h1 className="text-3xl font-bold tracking-tight">Editar categoria</h1>
      </div>
      <CategoryForm />
    </>
  );
};
export default RegisterCategory;
