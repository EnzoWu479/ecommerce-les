export interface PageResponse<T = unknown> {
  content: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
