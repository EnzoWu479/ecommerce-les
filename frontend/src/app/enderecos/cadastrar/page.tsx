import { GoBackButton } from '@/components/go-back-button';
import { ClientLayout } from '@/components/layouts/client-layout';
import { AddressForm } from '../components/address-form';

const AddressRegister = () => {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <GoBackButton />
          <h2 className="text-3xl font-bold tracking-tight">
            Cadastrar endereço
          </h2>
        </div>
        <AddressForm />
      </div>
    </ClientLayout>
  );
};
export default AddressRegister;
