import { IResponseData } from './ResponseData.interface';

export class ResponseData<T> implements IResponseData<T> {
  private data: T | null;
  private error: string | null;
  private status: number;

  constructor(data: T | null, error: string | null, status: number) {
    this.data = data;
    this.error = error;
    this.status = status;
  }
  public hasError(): boolean {
    return this.error !== null;
  }
  public getData(): T | null {
    return this.data;
  }
  public getStatus(): number {
    return this.status;
  }
  public getError(): string | null {
    return this.error;
  }
}
