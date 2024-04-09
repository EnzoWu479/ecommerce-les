import { Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { AddressFormDTO } from '@/validations/address.schema';
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge
} from 'react-hook-form';
import { ErrorMessage } from './ui/error-message';
import { ClientAddressType } from '@prisma/client';
import { masks } from '@/helpers/masks';
import { viaCep } from '@/lib/viaCep';
import { useEffect } from 'react';
import { streetTypes } from '@/utils/streetTypes';

interface Props {
  value: AddressFormDTO;
  onChange: (value: AddressFormDTO) => void;
  errors?:
    | Merge<FieldError, FieldErrorsImpl<AddressFormDTO>>
    | FieldErrors<AddressFormDTO>;
  onDelete?: () => void;
}

export const AddressForm = ({ value, onChange, errors, onDelete }: Props) => {
  const getAddressValue = async (cep: string) => {
    try {
      const data = await viaCep(cep);
      if (value) {
        onChange({
          ...value,
          streetType: data.logradouro.split(' ')[0],
          zipcode: cep,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.localidade,
          residenceType: data.logradouro.split(' ')[0]
        });
        // onChange({
        //   ...value,
        //   tipoLogradouro: data.logradouro.split(' ')[0],
        //   cep: cep,
        //   logradouro: data.logradouro,
        //   bairro: data.bairro,
        //   cidade: data.localidade,
        //   estado: data.localidade,
        //   pais: 'Brasil'
        // });
      }
    } catch (error) {}
  };
  const handleChange =
    (key: keyof AddressFormDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [key]: e.target.value });
    };
  const handleCheckboxChange = (type: ClientAddressType) => {
    return () => {
      if (!value.types.includes(type) && value.types.length < 3) {
        onChange({ ...value, types: [...value.types, type] });
      } else {
        onChange({ ...value, types: value.types.filter(t => t !== type) });
      }
    };
  };

  useEffect(() => {
    if (value.zipcode.replace(/\D/g, '').length === 8) {
      getAddressValue(value.zipcode);
    }
  }, [value.zipcode]);

  return (
    <Card className="grid grid-cols-3 gap-4 p-4">
      <div>
        <Label>Nome do endereço</Label>
        <Input
          value={value.name}
          name="address-name"
          onChange={handleChange('name')}
          error={errors?.name?.message}
        />
        <ErrorMessage error={errors?.name?.message} />
      </div>
      <div>
        <Label>CEP</Label>
        <Input
          value={value.zipcode}
          onChange={handleChange('zipcode')}
          name="zipcode"
          mask={masks.zipcode}
          error={errors?.zipcode?.message}
        />
        <ErrorMessage error={errors?.zipcode?.message} />
      </div>
      <div>
        <Label>Logradouro</Label>
        <Input
          value={value.street}
          onChange={handleChange('street')}
          error={errors?.street?.message}
        />
        <ErrorMessage error={errors?.street?.message} />
      </div>
      <div>
        <Label>Tipo de logradouro</Label>
        <Select
          value={value.streetType}
          onValueChange={v => onChange({ ...value, streetType: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {streetTypes.map(type => (
              <SelectItem value={type} key={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ErrorMessage error={errors?.streetType?.message} />
      </div>
      <div>
        <Label>Número</Label>
        <Input
          value={value.number}
          name="number"
          onChange={handleChange('number')}
          error={errors?.number?.message}
        />
        <ErrorMessage error={errors?.number?.message} />
      </div>
      <div>
        <Label>Bairro</Label>
        <Input
          value={value.neighborhood}
          onChange={handleChange('neighborhood')}
          error={errors?.neighborhood?.message}
        />
        <ErrorMessage error={errors?.neighborhood?.message} />
      </div>
      <div>
        <Label>Tipo de residência</Label>
        <Input
          value={value.residenceType}
          onChange={handleChange('residenceType')}
          error={errors?.residenceType?.message}
        />
        <ErrorMessage error={errors?.residenceType?.message} />
      </div>
      <div>
        <Label>Cidade</Label>
        <Input
          value={value.city}
          onChange={handleChange('city')}
          error={errors?.city?.message}
        />
        <ErrorMessage error={errors?.city?.message} />
      </div>
      <div>
        <Label>Estado</Label>
        <Input
          value={value.state}
          onChange={handleChange('state')}
          error={errors?.state?.message}
        />
        <ErrorMessage error={errors?.state?.message} />
      </div>
      <div className="col-span-3">
        <h3>Tipo de endereço</h3>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={value.types.includes(ClientAddressType.RESIDENCE)}
          onClick={handleCheckboxChange(ClientAddressType.RESIDENCE)}
          data-test={ClientAddressType.RESIDENCE}
        />
        <Label>Endereço residencial</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={value.types.includes(ClientAddressType.BILLING)}
          onClick={handleCheckboxChange(ClientAddressType.BILLING)}
          data-test={ClientAddressType.BILLING}
        />
        <Label>Endereço de cobrança</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={value.types.includes(ClientAddressType.SHIPPING)}
          onClick={handleCheckboxChange(ClientAddressType.SHIPPING)}
          data-test={ClientAddressType.SHIPPING}
        />
        <Label>Endereço de entrega</Label>
      </div>
      <div className="col-span-3">
        <ErrorMessage error={errors?.types?.message?.toString()} />
      </div>
      <div className="col-span-3 flex justify-end">
        {onDelete && (
          <button type="button" onClick={onDelete}>
            <Trash2 />
          </button>
        )}
      </div>
    </Card>
  );
};
