import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCardFormDTO } from '@/validations/creditCard.schema';
import { Trash2 } from 'lucide-react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { ErrorMessage } from './ui/error-message';
import { masks } from '@/helpers/masks';
import { RadioGroupItem } from './ui/radio-group';
import { useEffect } from 'react';
import { getBrand } from '@/utils/getBrand';

interface Props {
  value: CreditCardFormDTO;
  onChange: (value: CreditCardFormDTO) => void;
  errors?: Merge<FieldError, FieldErrorsImpl<CreditCardFormDTO>>;
  onDelete?: () => void;
  index?: number;
}

export const CreditCardForm = ({
  value,
  onChange,
  errors,
  onDelete,
  index
}: Props) => {
  useEffect(() => {
    if (value.number) {
      onChange({
        ...value,
        brand: getBrand(value.number)
      });
    }
  }, [value.number]);
  return (
    <Card className="grid grid-cols-3 gap-4 p-4">
      {index !== undefined && (
        <div className="col-span-3 flex items-center gap-2">
          <RadioGroupItem value={String(index)} />
          <Label>Cartão principal</Label>
        </div>
      )}
      <div>
        <Label>Nome do cartão</Label>
        <Input
          value={value.name}
          name="creditCardName"
          onChange={e => onChange({ ...value, name: e.target.value })}
          error={errors?.name?.message}
        />
        <ErrorMessage error={errors?.name?.message} />
      </div>
      <div>
        <Label>Número</Label>
        <Input
          value={value.number}
          name="number"
          mask={masks.creditCardNumber}
          onChange={e => onChange({ ...value, number: e.target.value })}
          error={errors?.number?.message}
        />
        <ErrorMessage error={errors?.number?.message} />
      </div>
      <div>
        <Label>Nome do titular</Label>
        <Input
          value={value.holderName}
          name="holderName"
          onChange={e => onChange({ ...value, holderName: e.target.value })}
          error={errors?.holderName?.message}
        />
        <ErrorMessage error={errors?.holderName?.message} />
      </div>
      <div>
        <Label>CVV</Label>
        <Input
          value={value.cvv}
          onChange={e => onChange({ ...value, cvv: e.target.value })}
          error={errors?.cvv?.message}
          name="cvv"
        />
        <ErrorMessage error={errors?.cvv?.message} />
      </div>
      <div>
        <Label>Data de validade</Label>
        <Input
          value={value.expiration}
          onChange={e => onChange({ ...value, expiration: e.target.value })}
          name="expiration"
          mask={masks.expireDateCard}
          error={errors?.expiration?.message}
        />
        <ErrorMessage error={errors?.expiration?.message} />
      </div>
      <div>
        <Label>Bandeira</Label>
        <Input
          value={value.brand}
          onChange={e => onChange({ ...value, brand: e.target.value })}
          error={errors?.brand?.message}
        />
        <ErrorMessage error={errors?.brand?.message} />
      </div>

      <div className="col-span-3 flex justify-end">
        {onDelete && (
          <button type="button" onClick={onDelete}>
            <Trash2 size={24} />
          </button>
        )}
      </div>
    </Card>
  );
};
