'use client';
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formaters } from '@/helpers/formaters';
import { CheckoutForm } from './components/checkout-form';
import { useCart } from '@/features/bag/useCart';
import { placeholderImage } from '@/lib/placeholderImage';

const CheckoutPage = () => {
  const { cart, total } = useCart();
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">Checkout</h2>
      <CheckoutForm />
    </div>
  );
};
export default CheckoutPage;
