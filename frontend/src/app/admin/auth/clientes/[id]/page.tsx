import { ClientForm } from '@/components/client-form';
import { GoBackButton } from '@/components/go-back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clientData } from '@/data/client';
import { Suspense } from 'react';

interface Props {
  id: string;
}
const ClientFormData = async ({ id }: Props) => {
  const client = await clientData.getById(id);

  return <ClientForm client={client} />;
};

const RegisterClientPage = ({ params: { id } }: { params: Props }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <GoBackButton />
        <h2 className="text-3xl font-bold tracking-tight">Editar cliente</h2>
      </div>
      <div className="mt-2">
        <Suspense fallback="Loading">
          <ClientFormData id={id} />
        </Suspense>
      </div>
    </>
  );
};
export default RegisterClientPage;
