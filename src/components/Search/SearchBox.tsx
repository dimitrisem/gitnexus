import SearchBoxStyle from '@/components/Search/SearchBox.style';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { getUiSel, setUi } from '@store/ui';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EUi, IAppState } from '@typeDefs';

import { searchOverlayShowDelay } from '@constants/generic';
import { zoomIcon } from '@constants/lordicon';

import GlassFx from '@components/GlassFx/GlassFx';
import LordIcon from '@components/LordIcon/LordIcon';

import { useGlassFx } from '@hooks/useGlassFx';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchContainerIconTrigger = useSelector( ( state: IAppState ) => getUiSel( state ).searchContainerIconTrigger );
  const glassFx = useGlassFx( searchOverlayShowDelay );
  const ownClass = SearchBoxStyle().root;
  const openSearchDialog = useCallback( () => {
    dispatch( setUi( EUi.isSearchDialogOpen, true ) );
  }, [] );

  return (
    <Box className={ `${ownClass} search-box` }>
      {/* @ts-ignore */}
      <Paper
        ref={ glassFx.ref }
        className={ `  ${ glassFx.glassFxChildClass }` }
        onMouseEnter={ glassFx.onGlassMouseEnter }
        onClick={ openSearchDialog }
        sx={ {
          borderRadius: '25px',
          p:            1,
        } }
      >
        <Grid 
          alignItems='center'
          justifyContent='center'
          sx={ { cursor: 'pointer' } }
        >
          <Grid item>
            <LordIcon trigger={ searchContainerIconTrigger } src={ zoomIcon } />
          </Grid>

          <Grid item alignItems='center'>
            <Typography variant='subtitle2' sx={ { mr: 1 } }>
              GitHub User Search 
            </Typography>
          </Grid>
        </Grid>

        <GlassFx useGlassFx={ glassFx } />
      </Paper>
    </Box>
  );
};

export default memo( SearchBox );
