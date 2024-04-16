import { buttonVariants } from '@/components/ui/button';
import { AdminAuthForm } from '@/components/admin/admin-auth-form';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ClientAuthForm } from '@/components/client/client-auth-form';

const ClientLogin = () => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/assets/og.webp"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image src="/assets/og.webp" fill alt="Authentication" />
          </div>
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
            <Image src="/assets/logo.png" width={30} height={30} alt="" />
            Ler Mundo
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Faça login para continuar
              </p>
            </div>
            <ClientAuthForm />
            <div>
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/criar-conta" className="font-bold text-gray-900">
                  Crie uma conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientLogin;
