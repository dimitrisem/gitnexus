import { IReduxPagination } from '@typeDefs';

class ObjCraftHelper {
  public craftReduxPagination = ( direction, pagination: IReduxPagination, newPage: number, newPerPage: number ) => ( {
    ...pagination,
    [ direction ]: {
      perPage: newPerPage,
      page:    newPage,
    }
  } ); 
}

export default new ObjCraftHelper();
