import { TablePagination } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { IPagination } from '@typeDefs';

import { getFilters } from '@utils';

import objCraftHelper from '@helpers/objCraft.helper';

const Pagination = ( props: IPagination ) => {
  const { pagination, dataCount, dataGetterFunction } = props;
  const dispatch = useDispatch();
  const perPageOptions = useMemo( () => getFilters( dataCount ), [ dataCount ] );
  const page = useMemo( () => pagination.next.page, [ pagination.next ] );
  const perPage = useMemo( () => pagination.next.perPage, [ pagination.next ] ); 
	
  const onPageChange = useCallback( ( e, newPage: number ) => {
    const newPagination = objCraftHelper.craftReduxPagination( 'next', pagination, newPage, pagination.next.perPage );
    dispatch( dataGetterFunction( newPagination ) );
  }, [] );

  const onRowsPerPageChange = useCallback( ( e ) => {
    const newPerPage = e.target.value;
    const newPagination = objCraftHelper.craftReduxPagination( 'next', pagination, pagination.next.page, newPerPage );
    dispatch( dataGetterFunction( newPagination ) );
  }, [ pagination ] );

  return (
    <TablePagination
      component='div'
      count={ dataCount }
      page={ page }
      rowsPerPage={ perPage }
      onPageChange={ onPageChange }
      rowsPerPageOptions={ perPageOptions }
      onRowsPerPageChange={ onRowsPerPageChange }
      showFirstButton
      showLastButton
    />
  );
};

export default memo( Pagination )
