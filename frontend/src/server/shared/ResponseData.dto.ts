interface ResponseDataDTOWithError {
  error: string;
  hasError: true;
  status: number;
}

interface ResponseDataDTOWithoutError<T> {
  data: T;
  hasError: false;
  status: number;
}
export type ResponseDataDTO<T> = ResponseDataDTOWithError | ResponseDataDTOWithoutError<T>;