import { GoBackButton } from '@/components/go-back-button';
import { ClientLayout } from '@/layouts/client-layout';
import { CreditCardForm } from '../components/credit-card-form';

const AddressRegister = () => {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <GoBackButton />
          <h1 className="text-3xl font-bold tracking-tight">
            Cadastrar cartão de crédito
          </h1>
        </div>
        <CreditCardForm />
      </div>
    </ClientLayout>
  );
};
export default AddressRegister;
