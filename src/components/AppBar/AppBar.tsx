import InfoButton from '@/components/InfoButton/InfoButton';
import LordIcon from '@/components/LordIcon/LordIcon';
import { aliensIcon, codeForkIcon, nightSkyIcon, refreshIcon, sunIcon } from '@/constants/lordicon';
import { getUiThemeAddonSel, getUiThemeSel, setUi } from '@/store/ui';
import { EUi, IAppState, IClassName } from '@/typeDefs';
import { isDarkTheme, isLightTheme } from '@utils';
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, Typography, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Chip } from '@mui/material';
import { Container, Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppBar = ( { className }: IClassName ) => {
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>( null );
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const uiThemeAddon = useSelector( ( state: IAppState ) => getUiThemeAddonSel( state ) );
  const dispatch = useDispatch();

  const handleOpenNavMenu = useCallback( ( event: React.MouseEvent<HTMLElement> ) => {
    setAnchorElNav( event.currentTarget );
  }, [] );

  const handleCloseNavMenu = useCallback( () => {
    setAnchorElNav( null );
  }, [] );

  const [ themeToggleIcon, setThemeToggleIcon ] = useState( sunIcon );
  const [ themeToggleTitle, setThemeToggleTitle ] = useState( 'Go Light.' );
  const [ themeToggleBody, setThemeToggleBody ] = useState( 'Drift into the radiance!' );

  const onThemeToggleClick = useCallback( () => {
    if ( isDarkTheme( uiTheme ) ) {
      dispatch( setUi( EUi.uiTheme, 'light' ) );
      setThemeToggleIcon( nightSkyIcon );
      setThemeToggleTitle( 'Go Dark.' );
      setThemeToggleBody( 'Drift into the abyss!' );
    } else {
      dispatch( setUi( EUi.uiTheme, 'dark' ) );
      setThemeToggleIcon( sunIcon );
      setThemeToggleTitle( 'Go Light.' );
      setThemeToggleBody( 'Drift into the radiance!' );
    }
  }, [ uiTheme ] );
	
  const onAbyssalSurferClick = useCallback( () => {
    const newUiThemeAddon = uiThemeAddon === '' ? 'abyssal-surfer' : '';
    dispatch( setUi( EUi.uiThemeAddon, newUiThemeAddon ) );
  }, [ uiThemeAddon ] );

  return (
    <MuiAppBar className={ className } position='static' sx={ { p: 0, m: 0 } }>
      <Container
        sx={ { maxWidth: 'initial !important' } }
        fixed
			 >
        <Toolbar disableGutters>
          <LordIcon src={ codeForkIcon } />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={ {
              mr:             2,
              display:        { xs: 'none', md: 'flex' },
              fontFamily:     'monospace',
              fontWeight:     700,
              letterSpacing:  '.3rem',
              color:          'inherit',
              textDecoration: 'none',
            } }
          >
            GitNexus
          </Typography>

          <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={ handleOpenNavMenu }
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
						
            <Menu
              id='menu-appbar'
              anchorEl={ anchorElNav }
              anchorOrigin={ {
                vertical:   'bottom',
                horizontal: 'left',
              } }
              keepMounted
              transformOrigin={ {
                vertical:   'top',
                horizontal: 'left',
              } }
              open={ Boolean( anchorElNav ) }
              onClose={ handleCloseNavMenu }
              sx={ {
                display: { xs: 'block', md: 'none' },
              } }
            >

            </Menu>
          </Box>
					
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={ {
              mr:             2,
              display:        { xs: 'flex', md: 'none' },
              flexGrow:       1,
              fontFamily:     'monospace',
              fontWeight:     700,
              letterSpacing:  '.3rem',
              color:          'inherit',
              textDecoration: 'none',
            } }
          >
            GitNexus
          </Typography>

          <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex', marginRight: '65px', justifyContent: 'flex-end' } } }>
            <MenuItem>
              <Chip color='secondary' label={ isLightTheme( uiTheme ) ? 'Light' : 'Dark' }/>
            </MenuItem>
						
            { uiThemeAddon && (
              <MenuItem>
                <Chip color='primary' label='Abyssal Surver' />
              </MenuItem>
            )}
            <MenuItem onClick={ handleCloseNavMenu }>
              <InfoButton
                popoverLordIconSrc={ refreshIcon }
                popoverTitle='Sync' 
                popoverBody='Retry fetching data.' 
                lordIconSrc={ null }
                lordIconTrigger='loop-on-hover'
                popoverAnchorOrigin={ {
                  vertical:   'bottom',
                  horizontal: 'center',
                } }
                popoverTransformOrigin={ {
                  vertical:   'top',
                  horizontal: 'center',
                } }
              />
            </MenuItem>
            
            <MenuItem onClick={ handleCloseNavMenu }>
              <InfoButton
                popoverLordIconSrc={ themeToggleIcon }
                popoverTitle={ themeToggleTitle }
                popoverBody={ themeToggleBody }
                onClick={ onThemeToggleClick }
                lordIconSrc={ null }
                popoverAnchorOrigin={ {
                  vertical:   'bottom',
                  horizontal: 'center',
                } }
                popoverTransformOrigin={ {
                  vertical:   'top',
                  horizontal: 'center',
                } }
              />
            </MenuItem>

            <MenuItem onClick={ handleCloseNavMenu }>
              <InfoButton
                disabled={ isLightTheme( uiTheme ) }
                popoverLordIconSrc={ aliensIcon }
                popoverTitle='Go AbyssalSurfur.'
                popoverBody='Venture into the cosmic abyss'
                onClick={ onAbyssalSurferClick }
                lordIconSrc={ null }
                popoverAnchorOrigin={ {
                  vertical:   'bottom',
                  horizontal: 'center',
                } }
                popoverTransformOrigin={ {
                  vertical:   'top',
                  horizontal: 'center',
                } }
              />
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
export default AppBar;
