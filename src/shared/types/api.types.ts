export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiListResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  message?: string;
  success?: boolean;
}
