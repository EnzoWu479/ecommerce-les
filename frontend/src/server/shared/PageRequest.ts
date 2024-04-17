export interface PageRequest<T = unknown> {
  page: number;
  limit: number;
  search?: T;
}
