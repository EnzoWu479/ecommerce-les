export interface PageRequest<T> {
  page: number;
  limit: number;
  search?: T;
}
