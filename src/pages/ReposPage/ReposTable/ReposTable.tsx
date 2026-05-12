import { TableContainer, TableCell, Grid, Chip, TableBody, Box } from '@mui/material';
import { getReposFetchStateSel, getReposSel, hasReposSel } from '@store/repos';
import { getUiSel, getUiThemeSel, hasErrorSel, hasSelectedUserSel, setUi } from '@store/ui';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';

import { EUi, IAppState } from '@typeDefs';

import { failedScreenSubtitle, failedScreenTitle } from '@constants/components';
import { cloudRefreshIcon, codinfgIcon, errorCrossIcon, quotationMarkIcon, reviewIcon, windIcon } from '@constants/lordicon';

import { convertToK, getVirtualizedRowClassName, isFetchStateFetched, isFetchStateFetching, truncateString } from '@utils';

import TableStyle from '@components/CommonTable/Table.style';
import DescriptionDisplayDialog from '@components/DescriptionDisplayDialog/DescriptionDisplayDialog';
import LordIcon from '@components/LordIcon/LordIcon';

import { useScreenSnap } from '@hooks/useScreenSnap';

const ReposTable = () => {
  const repos = useSelector( ( state: IAppState ) => getReposSel( state ).repos );
  const colWidthMd = 300;
  const reposFetchState = useSelector( ( state: IAppState ) => getReposFetchStateSel( state ) );
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const tableClass = TableStyle( { uiTheme } ).root;
  const getRowClassName = useCallback( ( { index } ) => getVirtualizedRowClassName( repos, index ), [] );
  const hasRepos = useSelector( ( state: IAppState ) => hasReposSel( state ) );
  const hasError = useSelector( ( state: IAppState ) => hasErrorSel( state ) );
  const hasSelectedUser = useSelector( ( state: IAppState ) => hasSelectedUserSel( state ) );
  const dispatch = useDispatch();
  const isDescriptionDisplayOpen = useSelector( ( state: IAppState ) => getUiSel( state ).isDescriptionDisplayOpen );

  // Throttle function: allows execution once per 500ms
  const onDescriptionClick = useCallback( ( description: string ) => {
    if ( !description && isDescriptionDisplayOpen ) return;
    dispatch( setUi( EUi.selectedRepoDescription, description ) );
    dispatch( setUi( EUi.isDescriptionDisplayOpen, true ) );
  }, [] );

  const renderScreenSnap = useCallback( () => {
    const primaryScreen = useScreenSnap();
    const fetchFailedScreen = useScreenSnap( failedScreenTitle, failedScreenSubtitle, errorCrossIcon );
    const fetchingScreen = useScreenSnap( 'Syncing....', '', cloudRefreshIcon );
    const noReposScreen = useScreenSnap( 'No Repos', '', windIcon )
		
    switch ( true ) {
      case ( hasError ):
        return <fetchFailedScreen.snap />;
      case ( isFetchStateFetching( reposFetchState ) ):
        return <fetchingScreen.snap />
      case ( !hasRepos && isFetchStateFetched( reposFetchState ) ):
        return <noReposScreen.snap />
      default:
        return <primaryScreen.snap />
    }
  }, [ hasSelectedUser, reposFetchState ] );

  return (
    <>
      <DescriptionDisplayDialog />
      <TableContainer style={ { height: 550, width: '100%' } }>
        <TableBody>
          { renderScreenSnap() }
        </TableBody>
		
        {hasRepos && !isFetchStateFetching( reposFetchState ) && (
          <AutoSizer>
            {( { height, width } ) => (
              <Box sx={ { width: '100%', height: '30vh' } }>
                <VirtualizedTable
                  className={ tableClass }
                  width={ width }
                  height={ height }
                  headerHeight={ 80 }
                  rowHeight={ 40 }
                  rowCount={ repos.length }
                  rowGetter={ ( { index } ) => repos[ index ] }
                  rowClassName={ getRowClassName }
                >
                  <Column
                    dataKey='full_name'
                    cellRenderer={ ( { cellData } ) => (
                      <TableCell>
                        <Chip color='primary' label={ cellData } />
                      </TableCell>
                    ) }
                    width={ colWidthMd }
                    headerRenderer={ () => (
                      <TableCell>
                        <Grid alignItems='center'>
                          <Grid item>
                            <LordIcon src={ codinfgIcon } />
                          </Grid>
                          <Grid item>
                            Name
                          </Grid>
                        </Grid>
                      </TableCell>
                    ) }
                  />

                  <Column
                    dataKey='description'
                    width={ 600 }
                    cellRenderer={ ( { cellData } ) => (
                      <TableCell>
                        <Chip
                          onClick={ ( event ) => {
                            event.stopPropagation(); // Prevents event bubbling if needed
                            onDescriptionClick( cellData );
                          } }
                          color='secondary'
                          label={ typeof cellData === 'string' ? truncateString( cellData, 50 ) : '' }
                          clickable
                        />
                      </TableCell>
                    ) }
                    headerRenderer={ () => (
                      <TableCell>
                        <Grid container alignItems='center' justifyContent='center'>
                          <Grid item>
                            <LordIcon src={ quotationMarkIcon } />
                          </Grid>
                          <Grid item>
                            Description
                          </Grid>
                        </Grid>
                      </TableCell>
                    ) }
                  />

                  <Column
                    dataKey='stargazers_count'
                    width={ 100 }
                    cellRenderer={ ( { cellData } ) => (
                      <TableCell>
                        <Chip color='info' label={ convertToK( cellData ) } />
                      </TableCell>
                    ) }
                    headerRenderer={ () => (
                      <TableCell>
                        <Grid alignItems='center'>
                          <Grid item>
                            <LordIcon src={ reviewIcon } />
                          </Grid>
                          <Grid item>
                            Stars
                          </Grid>
                        </Grid>
                      </TableCell>
                    ) }
                  />
                </VirtualizedTable>
              </Box>
            )}
          </AutoSizer>
        )}
      </TableContainer>
    </>
  );
};

export default ReposTable;
