import { getUiThemeAddonSel, getUiThemeSel, setUi } from '@/store/ui';
import { EUi, IAppState } from '@/typeDefs';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isAbyssalSurferThemeAddon } from '@utils';

export const useAbyssalSurferThemeAddon = ( doUninstall: boolean = false ) => {
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const uiThemeAddon = useSelector( ( state: IAppState ) => getUiThemeAddonSel( state ) );
  const dispatch = useDispatch();

  const install = useCallback( () => {
    document.body.classList.add( 'abyssal-surfer' );
  }, [] );

  const uninstall = useCallback( () => {
    document.body.classList.remove( 'abyssal-surfer' );
    dispatch( setUi( EUi.uiThemeAddon, '' ) );
  }, [] );
	
  useEffect( () => {
    uninstall();
  }, [ uiTheme ] );
	
  useEffect( () => {
    if ( isAbyssalSurferThemeAddon( uiThemeAddon ) ) {
      install();
      return () => uninstall()
    }
    // Default return in case the condition is false
    return () => {};
  }, [ uiThemeAddon ] ); // Make sure the effect depends on the relevant state or props
}
