import { IMask } from '@/helpers/masks';

export enum SearchType {
  STRING = 'string',
  OPTION = 'option',
  DATE = 'date'
}
export interface IOption {
  value: string;
  label: string;
}
export type SearchFieldString = {
  type: SearchType.STRING;
  mask?: IMask;
  label: string;
  name: string;
};
export type SearchFieldDate = {
  type: SearchType.DATE;
  label: string;
  name: string;
};
export type SearchFieldOption = {
  type: SearchType.OPTION;
  label: string;
  options: IOption[];
  name: string;
};
export type SearchField =
  | SearchFieldString
  | SearchFieldDate
  | SearchFieldOption;
