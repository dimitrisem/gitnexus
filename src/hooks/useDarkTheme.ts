import { getUiThemeSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { isDarkTheme } from '@utils';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useDarkTheme = () => {
  const theme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );

  const install = useCallback( () => {
    document.body.classList.add( 'dark-theme' );
  }, [] );

  const uninstall = useCallback( () => {
    document.body.classList.remove( 'dark-theme' );
  }, [] );
	
  useEffect( () => {
    if ( isDarkTheme( theme ) ) {
      install();
      return () => uninstall();
    }
		
    return () => {};
  }, [ theme ] );
}
