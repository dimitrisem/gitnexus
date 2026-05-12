import AppRoutes from '@/components/App/AppRoutes';
import AppBar from '@/components/AppBar/AppBar';
import NavBar from '@/components/NavBar/NavBar';
import Particles from '@/components/Particles/Particles';
import UiTheme from '@/components/UiTheme/UiTheme';
import { getUiSel, getUiThemeSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MotionLazy } from '@vendor/MuiMinimal/components/animate/motion-lazy';
import { SettingsProvider } from '@vendor/MuiMinimal/components/settings';
import { SnackbarProvider } from '@vendor/MuiMinimal/components/snackbar';
import ThemeProvider from '@vendor/MuiMinimal/theme';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainElMUIMt, navbarElLeft, topProgressPortalId } from '@constants/components';

import SearchBox from '@components/Search/SearchBox';
import SearchDialog from '@components/Search/SearchDialog';

const App = () => {
  const isUiLoading = useSelector( ( state: IAppState ) => getUiSel( state ).isUiLoading );
  useSelector( ( state: IAppState ) => getUiThemeSel( state ) );

  return (
    <>
      <SettingsProvider
        defaultSettings={ {
          themeMode:         'dark',
          themeDirection:    'ltr',
          themeContrast:     'default',
          themeLayout:       'vertical',
          themeColorPresets: 'orange',
          themeStretch:      false,
        } }
      >
        <ThemeProvider>
          <MotionLazy>
            <SnackbarProvider>
              <CssBaseline />
              <UiTheme>
                <div id={ topProgressPortalId } />
                <AppBar />

                <Grid flexDirection='column' className='w-100 h-100'>
                  {/* Layout... */}
                  <Grid item sx={ { width: '100%', height: '100%' } } flex='1 0'>
                    <Router>
                      <Grid 
                        item 
                        flexDirection='column'
                        sx={ { marginLeft: `${navbarElLeft}px`, marginRight: '15px', mt: mainElMUIMt } }>
                        <NavBar />
                      </Grid>

                      <Box component='main' sx={ { width: '100%', height: '100%', mt: mainElMUIMt, mr: '15px' } }>
                        <AppRoutes />
                      </Box>
                    </Router>
                  </Grid>
                </Grid>

                { !isUiLoading && (
                  <>
                    <SearchBox />
                    <SearchDialog />
                  </>
                ) }
              </UiTheme>
            </SnackbarProvider>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </>
  );
};

export default memo( App );
