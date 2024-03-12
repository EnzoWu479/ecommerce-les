'use client';

import { SelectProps } from '@radix-ui/react-select';
import { Select } from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props extends Omit<SelectProps, 'onValueChange'> {
  keyword: string;
}
export const SelectNavigator = ({ keyword, ...rest }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams || '');
  return (
    <Select
      {...rest}
      onValueChange={value => {
        newParams.set(keyword, value);
        router.push(`${pathname}?${newParams.toString()}`);
      }}
    />
  );
};
