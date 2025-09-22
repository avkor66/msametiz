export interface Pageable<T> {
  users: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
