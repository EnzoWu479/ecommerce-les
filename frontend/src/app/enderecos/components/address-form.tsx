'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Controller, useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AddressForm as RealAddressForm } from '@/components/address-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFormDTO, addressSchema } from '@/validations/address.schema';

export const AddressForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<AddressFormDTO>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      id: '',
      addressId: '',
      types: [],
      zipcode: ''
    }
  });
  const router = useRouter();

  console.log(errors);

  const onSubmit = handleSubmit(async () => {
    toast.success('Endereço salvo com sucesso');
    router.back();
  });

  return (
    <div className="flex flex-col space-y-2">
      <form onSubmit={onSubmit}>
        <RealAddressForm value={watch()} onChange={reset} errors={errors} />
        <div className="col-span-3 flex justify-end mt-4">
          <Button type="submit" data-test="submit-button">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
