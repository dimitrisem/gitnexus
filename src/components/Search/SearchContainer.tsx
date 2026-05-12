import { bezierButterFramerM, slideInDownAnim, slideInDownInit } from '@/constants/css';
import { Grid, Paper, Typography } from '@mui/material';
import { getUiSel, setUi } from '@store/ui';
import { m } from 'framer-motion';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EUi, IAppState } from '@typeDefs';

// @ts-ignore
import { zoomIcon } from '@constants/lordicon';

import LordIcon from '@components/LordIcon/LordIcon';

import SearchInput from './SearchInput';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const ui = useSelector( ( state: IAppState ) => ( {
    isSearchDialogOpen:         getUiSel( state ).isSearchDialogOpen,
    searchContainerIconTrigger: getUiSel( state ).searchContainerIconTrigger,
	 } ) );

  const openSearchDialog = useCallback( () => {
    if ( !ui.isSearchDialogOpen ) {
      dispatch( setUi( EUi.isSearchDialogOpen, true ) );
    }
  }, [ ui.isSearchDialogOpen ] );

  return (
    <m.div
      initial={ slideInDownInit }
      animate={ slideInDownAnim }
      transition={ { duration: 0.35, ease: bezierButterFramerM } }
    >
      <Paper
        className={ `no-selection` }
        sx={ {
          height:       'fit-content',
          p:            1,
          borderRadius: '25px',
        } }
        onClick={ openSearchDialog }
      >
        <Grid container alignItems='center' justifyContent='center'>
          <Grid item>
            <LordIcon
              trigger={ ui.searchContainerIconTrigger }
              src={ zoomIcon }
            />
          </Grid>

          <Grid item>
            <Typography variant='subtitle2'>
              <SearchInput />
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </m.div>
  );
};

export default memo( SearchContainer );
