import { IReduxPagination } from '@/typeDefs';

export const reduxPaginationDefault: IReduxPagination = {
  first:  { perPage: 51, page: 1, },
  prev:  { perPage: 51, page: 1, },
  last:  { perPage: 51, page: 1, },
  next:  { perPage: 51, page: 1, },
  total: 0,
}
