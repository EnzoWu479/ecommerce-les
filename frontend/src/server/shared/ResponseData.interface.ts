export interface IResponseData<T> {
  hasError(): boolean;
  getData(): T | null;
  getStatus(): number;
  getError(): string | null;
}
