import { setUi } from '@store/ui';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { EUi } from '@typeDefs';

export const useInitApp = () => {
  const dispatch = useDispatch();
	
  useEffect( () => {
    dispatch( setUi( EUi.isUiLoading, false ) );
  }, [] );
}
