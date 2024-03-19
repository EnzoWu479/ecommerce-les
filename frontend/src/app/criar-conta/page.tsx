import { buttonVariants } from '@/components/ui/button';
import { AdminAuthForm } from '@/components/admin/admin-auth-form';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ClientForm } from '@/components/admin/client/client-form';

const ClientRegister = () => {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Cadastro
              </h1>
              <p className="text-sm text-muted-foreground">
                Cadastre sua conta
              </p>
            </div>
            <ClientForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientRegister;
