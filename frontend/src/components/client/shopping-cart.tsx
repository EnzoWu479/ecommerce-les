'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useBagStore } from '@/features/bag/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formaters } from '@/helpers/formaters';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { useCart } from '@/features/bag/useCart';
import { placeholderImage } from '@/lib/placeholderImage';
import { InputValueControl } from '../input-value-control';

export const ShoppingCart = () => {
  const { isOpen, setIsOpen } = useBagStore();
  const { cart, total, removeProductFromCart } = useCart();
  const router = useRouter();

  const handleRemove = async (productId: string) => {
    try {
      await removeProductFromCart(productId);
      toast.success('Produto removido do carrinho');
    } catch (error) {
      toast.error('Erro ao remover produto do carrinho');
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Meu Carrinho
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart?.productCart.map(product => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={placeholderImage({
                                      preview: product.book?.name
                                    })}
                                    alt={product.book?.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link href={`/produto/${product.id}`}>
                                          {product.book?.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        <span className="text-sm text-gray-500">
                                          {product.amount} x{' '}
                                        </span>
                                        {formaters.money(
                                          product.book.priceSell
                                        )}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.book?.author}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <InputValueControl
                                      value={product.amount}
                                      // onIncrement={handleIncrement}
                                      // onDecrement={handleDecrement}
                                    />

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemove(product.book.id)
                                        }
                                        className="text-bold font-medium  text-slate-900"
                                      >
                                        Remover
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formaters.money(total)}</p>
                      </div>
                      <div className="mt-6">
                        <Button asChild className="w-full">
                          <Link
                            href="/checkout"
                            data-test="checkout-button"
                            onClick={() => setIsOpen(false)}
                          >
                            Checkout
                          </Link>
                        </Button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-bold font-medium text-slate-900"
                            onClick={() => setIsOpen(false)}
                          >
                            Continue suas compras
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
