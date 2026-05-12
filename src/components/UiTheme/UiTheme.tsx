import { Box } from '@mui/material';
import { useAbyssalSurferThemeAddon } from 'hooks/useAbyssalSurferThemeAddon';
import { useAllTransition } from 'hooks/useAllTransition';
import { useDarkTheme } from 'hooks/useDarkTheme';
import { useLightTheme } from 'hooks/useLightTheme';
import { useSelector } from 'react-redux';
import { getUiThemeAddonSel, getUiThemeSel } from 'store/ui';
import { IAppState, IChildren } from 'typeDefs';

import { isAbyssalSurferThemeAddon } from '@utils';

import Particles from '@components/Particles/Particles';

const UiTheme = ( { children }: IChildren ) => {
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const uiThemeAddon = useSelector( ( state: IAppState ) => getUiThemeAddonSel( state ) );
  useDarkTheme()
  useLightTheme();
  useAbyssalSurferThemeAddon();
  const isAnyThemeAddon = isAbyssalSurferThemeAddon( uiThemeAddon );
  useAllTransition();

  return (
  /* @ts-ignore */
    <Box clsasName={ `${uiTheme}-theme ${uiThemeAddon}-theme-addon` }>
      { isAnyThemeAddon && <Particles /> }
      { children }
    </Box>
  );
}

export default UiTheme;
