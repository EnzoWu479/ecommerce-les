import { GoBackButton } from '@/components/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterCategory = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">
          Cadastrar categoria
        </h2>
      </div>
      <form action="" className="mt-6 space-y-6">
        <div className="w-96">
          <Label>Nome da categoria</Label>
          <Input />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </>
  );
};
export default RegisterCategory;
