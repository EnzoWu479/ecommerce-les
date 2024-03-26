'use client';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClientFormSchema,
  clientFormSchema
} from '@/validations/clientForm.schema';
import { Gender } from '@prisma/client';
import { ErrorMessage } from './ui/error-message';
import { masks } from '@/helpers/masks';
import { AddressForm } from './address-form';
import { addressEmpty } from '@/validations/address.schema';
import { creditCardEmpty } from '@/validations/creditCard.schema';
import { CreditCardForm } from './creditCard-form';
import { cn } from '@/lib/utils';
import { clientData } from '@/data/client';
import { IClient } from '@/types/client';
import { formaters } from '@/helpers/formaters';

const jsonExemplo: ClientFormSchema = {
  name: 'Enzo',
  email: 'enwu2014@hotmail.com',
  password: '12345678Aa@',
  passwordConfirmation: '12345678Aa@',
  birthDate: '2004-05-22',
  cpf: '111.111.111-11',
  gender: 'MALE',
  creditCards: [
    {
      id: null,
      number: '1111 1111 1111 1111',
      name: 'Cartão da mamãe',
      holderName: 'Enzo Yuji Wu',
      expiration: '12/26',
      cvv: '111',
      brand: 'Visa',
      isMain: false
    }
  ],
  addresses: [
    {
      id: null,
      addressId: null,
      name: 'Minha casa',
      street: 'Alameda Meyer Joseph Nigri',
      streetType: 'Alameda',
      number: '5',
      neighborhood: 'Cidade Cruzeiro do Sul',
      residenceType: 'Alameda',
      zipcode: '08673-170',
      city: 'Suzano',
      state: 'Suzano',
      types: ['RESIDENCE', 'BILLING', 'SHIPPING']
    }
  ]
};

interface Props {
  client?: IClient;
}

export const ClientForm = ({ client }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client?.name,
      email: client?.account?.email,
      cpf: masks.cpf(client?.cpf || ''),
      birthDate: formaters.date(client?.birthDate || '', 'yyyy-MM-dd'),
      gender: client?.gender,
      ...(client && {
        password: '12345678Aa@',
        passwordConfirmation: '12345678Aa@'
      }),
      addresses: client?.addresses
        ? client.addresses.map(address => ({
            id: address.id,
            addressId: address.address.id,
            name: address.name,
            street: address.address.street,
            streetType: address.address.streetType,
            number: address.address.number,
            neighborhood: address.address.city.name,
            residenceType: address.address.residenceType,
            zipcode: address.address.zipCode,
            city: address.address.city.name,
            state: address.address.city.state.uf,
            types: address.types
          }))
        : [addressEmpty],
      creditCards: client?.cards
        ? client.cards.map(card => ({
            id: card.id,
            number: card.number,
            name: card.name,
            holderName: card.holderName,
            expiration: formaters.date(card.expDate, 'MM/yy'),
            cvv: card.cvv,
            brand: card.brand.name,
            isMain: card.mainCardId !== null
          }))
        : [creditCardEmpty]
    }
    // defaultValues: {
    //   addresses: [addressEmpty],
    //   creditCards: [creditCardEmpty]
    // }
    // defaultValues: jsonExemplo
  });

  const addressFields = useFieldArray({
    control,
    name: 'addresses'
  });

  const handleAddAddress = () => {
    addressFields.append(addressEmpty);
  };
  const handleDeleteAddress = (index: number) => {
    addressFields.remove(index);
  };

  const hasAddressErrors = (JSON.stringify(errors.addresses) || '') !== '';

  const creditcardFields = useFieldArray({
    control,
    name: 'creditCards'
  });

  const handleAddCreditCard = () => {
    creditcardFields.append(creditCardEmpty);
  };
  const handleDeleteCreditCard = (index: number) => {
    creditcardFields.remove(index);
  };

  const hasCreditCardErrors = (JSON.stringify(errors.creditCards) || '') !== '';

  const onSubmit = handleSubmit(async value => {
    console.log(value);

    try {
      if (client) {
        await clientData.update(client.id, value);
        toast({
          title: 'Cadastro atualizado com sucesso',
          description: 'O seu cadastro foi salvo'
        });
        router.push('/admin/auth/clientes');
      } else {
        await clientData.create(value);
        toast({
          title: 'Cadastro realizado com sucesso',
          description: 'O seu cadastro foi salvo'
        });
        router.push('/login');
      }
    } catch (error) {
      if (client) {
        toast({
          title: 'Erro ao atualizar',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Erro ao salvar',
          variant: 'destructive'
        });
      }
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Tabs defaultValue="personal">
        <TabsList className="mx-auto flex w-fit">
          <TabsTrigger value="personal">Dados pessoais</TabsTrigger>
          <TabsTrigger
            value="address"
            className={cn(hasAddressErrors && 'bg-red-400 text-white')}
          >
            Endereço
          </TabsTrigger>
          <TabsTrigger
            value="credit-card"
            className={cn(hasCreditCardErrors && 'bg-red-400 text-white')}
          >
            Cartão
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="space-y-2">
            <div>
              <Label>Nome</Label>
              <Input
                className="w-80"
                {...register('name')}
                error={errors.name?.message}
              />
              <ErrorMessage error={errors.name?.message} />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Data de nascimento</Label>
              {/* <Controller
                control={control}
                name="birthDate"
                render={({ field: { value, onChange } }) => (
                  <DatePicker value={value} onChange={onChange} />
                )}
              /> */}
              <Input
                type="date"
                className="w-80"
                {...register('birthDate')}
                error={errors.birthDate?.message}
                // onInput={e => console.log(e.target.value)}
              />
              <ErrorMessage error={errors.birthDate?.message} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="w-80"
                {...register('email')}
                error={errors.email?.message}
              />
              <ErrorMessage error={errors.email?.message} />
            </div>
            <div>
              <Label>CPF</Label>
              <Input
                className="w-80"
                mask={masks.cpf}
                {...register('cpf')}
                error={errors.cpf?.message}
              />
              <ErrorMessage error={errors.cpf?.message} />
            </div>
            <div className="w-96">
              <Label>Gênero</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-80">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={Gender.MALE}>Masculino</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Feminino</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage error={errors.gender?.message} />
            </div>
            {!client && (
              <div className="grid max-w-[41rem] grid-cols-2 gap-4">
                <div>
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <ErrorMessage error={errors.password?.message} />
                </div>
                <div>
                  <Label>Confirmar senha</Label>
                  <Input
                    type="password"
                    {...register('passwordConfirmation')}
                    error={errors.passwordConfirmation?.message}
                  />
                  <ErrorMessage error={errors.passwordConfirmation?.message} />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="address">
          <div className="flex flex-col space-y-2">
            <Button type="button" className="w-fit" onClick={handleAddAddress}>
              Adicionar endereço
            </Button>
            <ErrorMessage
              error={
                errors.addresses?.message || errors.addresses?.root?.message
              }
            />
            <div className="space-y-4">
              {addressFields.fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  name={`addresses.${index}`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <AddressForm
                        value={value}
                        onChange={onChange}
                        errors={errors.addresses?.[index]}
                        onDelete={() => handleDeleteAddress(index)}
                      />
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="credit-card">
          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              className="w-fit"
              onClick={handleAddCreditCard}
            >
              Adicionar cartão
            </Button>
            <ErrorMessage
              error={
                errors.creditCards?.message || errors.creditCards?.root?.message
              }
            />
            <div>
              {creditcardFields.fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  name={`creditCards.${index}`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <CreditCardForm
                        value={value}
                        onChange={onChange}
                        errors={errors.creditCards?.[index]}
                        onDelete={() => handleDeleteCreditCard(index)}
                      />
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div>
        <Button>Salvar</Button>
      </div>
    </form>
  );
};
