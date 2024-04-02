import { CategoryForm } from '@/components/admin/category-form';
import { CoupomForm } from '@/components/admin/coupom-form';
import { GoBackButton } from '@/components/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterCoupom = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Cadastrar cupom</h2>
      </div>
      <CoupomForm />
    </>
  );
};
export default RegisterCoupom;
