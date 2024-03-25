import { ClientForm } from '@/components/client-form';
import { GoBackButton } from '@/components/go-back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RegisterClientPage = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Cadastrar cliente</h2>
      </div>
      <div className="mt-2">
        <ClientForm />
      </div>
    </>
  );
};
export default RegisterClientPage;
