export interface PageResponse<T> {
  content: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
