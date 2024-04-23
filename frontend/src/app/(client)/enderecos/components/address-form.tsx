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
import { addressData } from '@/services/data/address';
import { useQueryAddressItem } from '@/services/query/useQueryAddress';
import { useEffect } from 'react';

interface Props {
  id?: string;
}

export const AddressForm = ({ id }: Props) => {
  const { data: addressItem } = useQueryAddressItem(id);
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
  console.log(addressItem);

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await addressData.update(id, {
          ...data
        });
      } else {
        await addressData.create({
          ...data
        });
      }
      toast.success('Endereço salvo com sucesso');
      router.back();
    } catch (error) {
      toast.error('Erro ao salvar endereço');
    }
  });

  useEffect(() => {
    if (addressItem) {
      reset({
        id: addressItem.id,
        addressId: addressItem.addressId,
        types: addressItem.types,
        zipcode: addressItem.address.zipCode,
        street: addressItem.address.street,
        city: addressItem.address.city.name,
        state: addressItem.address.city.state.uf,
        neighborhood: addressItem.address.neighborhood,
        name: addressItem.name,
        number: addressItem.address.number,
        residenceType: addressItem.address.residenceType,
        streetType: addressItem.address.streetType
      });
    }
  }, [addressItem]);

  return (
    <div className="flex flex-col space-y-2">
      <form onSubmit={onSubmit}>
        <RealAddressForm value={watch()} onChange={reset} errors={errors} />
        <div className="col-span-3 mt-4 flex justify-end">
          <Button type="submit" data-test="submit-button">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
