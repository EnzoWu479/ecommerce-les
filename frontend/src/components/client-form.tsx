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
import { clientData } from '@/services/data/client';
import { IClient } from '@/types/client';
import { formaters } from '@/helpers/formaters';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'react-toastify';
import { ResponseData } from '@/server/shared/ResponseDataImp';

const jsonExemplo: ClientFormSchema = {
  name: 'Enzo',
  email: 'enwu2014@hotmail.com',
  password: '12345678Aa@',
  passwordConfirmation: '12345678Aa@',
  birthDate: '2004-05-22',
  cpf: '111.111.111-11',
  gender: 'MALE',
  mainCard: '',
  creditCards: [
    {
      id: null,
      number: '1111 1111 1111 1111',
      name: 'Cartão da mamãe',
      holderName: 'Enzo Yuji Wu',
      expiration: '12/26',
      cvv: '111',
      brand: 'Visa'
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

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client?.name,
      email: client?.account?.email,
      cpf: masks.cpf(client?.cpf || ''),
      birthDate: formaters.date(client?.birthDate || '', 'yyyy-MM-dd'),
      mainCard: String(
        client?.cards?.findIndex(
          card => card.id === client.mainCard?.creditCardId
        ) ?? ''
      ),
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
            neighborhood: address.address.neighborhood,
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
  // toast.success('Cadastro realizado com sucesso', {
  //   autoClose: 600000
  // });

  const hasCreditCardErrors = (JSON.stringify(errors.creditCards) || '') !== '';

  const onSubmit = handleSubmit(async value => {
    console.log(value);

    try {
      if (client) {
        await clientData.update(client.id, value);
        toast.success('Cadastro atualizado com sucesso');
        router.push('/admin/clientes');
      } else {
        await clientData.create(value);
        toast.success('Cadastro realizado com sucesso');
        router.push('/login');
      }
    } catch (error: any) {
      const response = error.response.data as ResponseData;

      toast.error(response.error || 'Erro ao salvar');
      // if (client) {
      // } else {
      //   toast.error('Erro ao salvar');
      // }
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <h2 className="text-xl font-bold">Informações pessoais</h2>
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
        <div className="w-96" data-test="gender-select">
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
      <div className="flex flex-col space-y-2">
        <h2 className="mt-4 text-xl font-bold">Endereços</h2>
        <Button
          type="button"
          data-test="add-address-button"
          className="w-fit"
          onClick={handleAddAddress}
        >
          Adicionar endereço
        </Button>
        <ErrorMessage
          error={errors.addresses?.message || errors.addresses?.root?.message}
        />
        <div className="space-y-4">
          {addressFields.fields.map((field, index) => (
            <div key={field.id} data-test={`address-form[${index}]`}>
              <Controller
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
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="mt-8 text-xl font-bold">Cartões de crédito</h2>
        <Button
          type="button"
          data-test="add-credit-card-button"
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
          <RadioGroup
            value={watch('mainCard')}
            onValueChange={value => setValue('mainCard', value)}
          >
            {creditcardFields.fields.map((field, index) => (
              <div key={field.id} data-test={`creditcard-form[${index}]`}>
                <Controller
                  control={control}
                  name={`creditCards.${index}`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <CreditCardForm
                        value={value}
                        onChange={onChange}
                        errors={errors.creditCards?.[index]}
                        onDelete={() => handleDeleteCreditCard(index)}
                        index={index}
                      />
                    );
                  }}
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div>
        <Button data-test="save-button">Salvar</Button>
      </div>
    </form>
  );
};
