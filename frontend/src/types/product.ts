export interface IProduct {
  id: string;
  name: string;
  author: string;
  year: number;
  categories: ICategory[];
  description: string;
  publisher: string;
  edition: string;
  isbn: string;
  numberOfPages: number;

  imageSrc: string;
  price: number;
  dimensions: IDimensions;
  priceGroup: IPriceGroup;
}
export interface ICategory {
  id: string;
  name: string;
}
export interface IDimensions {
  id: string;
  height: number;
  width: number;
  weight: number;
  depth: number;
}
export interface IPriceGroup {
  name: string;
  profitMarginPercent: number;
}
