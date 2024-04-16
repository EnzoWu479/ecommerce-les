import { ChangePasswordForm } from '@/components/client/change-password-form';
import { GoBackButton } from '@/components/go-back-button';
import { ClientLayout } from '@/components/layouts/client-layout';

const AddressRegister = () => {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Alterar senha</h1>
        </div>
        <ChangePasswordForm />
      </div>
    </ClientLayout>
  );
};
export default AddressRegister;
