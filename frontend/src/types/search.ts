export enum SearchType {
  STRING = 'string',
  OPTION = 'option'
}
export interface IOption {
  value: string;
  label: string;
}
export type SearchFieldString = {
  type: SearchType.STRING;
  name: string;
};
export type SearchFieldOption = {
  type: SearchType.OPTION;
  options: IOption[];
  name: string;
};
export type SearchField = SearchFieldString | SearchFieldOption;