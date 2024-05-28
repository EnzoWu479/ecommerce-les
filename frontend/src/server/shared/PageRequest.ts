export interface PageRequest<T = unknown> {
  page: number;
  limit: number;
  category?: string;
  search?: Partial<T>;
}
