import { getUiThemeSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { isLightTheme } from '@utils';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useLightTheme = () => {
  const theme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );

  const install = useCallback( () => {
    document.body.classList.add( 'light-theme' );
  }, [] );

  const uninstall = useCallback( () => {
    document.body.classList.remove( 'light-theme' );
  }, [] );
	
  useEffect( () => {
    if ( isLightTheme( theme ) ) {
      install();
      return () => uninstall();
    }
		
    return () => {};
  }, [ theme ] );
}
