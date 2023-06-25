export interface IPagination<T> {
  page: number;
  perPage: number;
  valueCount: number;
  valueFound: number;
  prev: string;
  next: string;
  data: T;
}
