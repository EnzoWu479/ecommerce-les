import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { masks } from '@/helpers/masks';
import { IClientAddress } from '@/types/client';

interface Props {
  addresses: IClientAddress[];
  value: string;
  onChange: (value: string) => void;
}
export const AddressList = ({ addresses, value, onChange }: Props) => {
  return (
    <RadioGroup value={value} onValueChange={value => onChange(value)}>
      <div className="max-h-24 space-y-2 overflow-auto">
        {addresses?.map((address, index) => (
          <div className="flex items-center gap-2" key={address.id}>
            <RadioGroupItem
              value={address.address.id}
              data-test={`address-${index + 1}`}
            />
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer hover:underline">
                {address.name}
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                {address.address.street}, {address.address.number} -{' '}
                {address.address.neighborhood} <br />{' '}
                {address.address.city.name} - {address.address.city.state.uf},{' '}
                {masks.zipcode(address.address.zipCode)}
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};
