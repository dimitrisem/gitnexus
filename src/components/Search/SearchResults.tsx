/* @ts-ignore */
import searchResult from '@/components/Search/searchResult';
import { Box } from '@mui/system';
import { getUiSel, hasSearchResultsSel, setUi } from '@store/ui';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';

import { EUi, IAppState, IGitHubSearchResult } from '@typeDefs';

import { githubGetUser } from '@store/github';
import { isSearchStateNoResults, isSearchStateSearching } from '@/utils/states.util';
import { useScreenSnap } from '@/hooks/useScreenSnap';
import { binocularsIcon, errorCrossIcon, helloIcon, windIcon } from '@/constants/lordicon';

const SearchResults = () => {
  const searchResults = useSelector( ( state: IAppState ) => getUiSel( state ).searchResults );
  const hasSearchFailed = useSelector( ( state: IAppState ) => getUiSel( state ).hasSearchFailed );
  const hasSearchResults = useSelector( ( state: IAppState ) => hasSearchResultsSel( state ) );
  const ui = useSelector( ( { ui }: IAppState ) => ( {
    searchPhrase:         ui.searchPhrase,
    selectedSearchResult: ui.selectedSearchResult,
    searchState:          ui.searchState,
  } ) );

  const dispatch = useDispatch();

  const onSearchResultClick = useCallback( ( searchResult: IGitHubSearchResult ) => {
    dispatch( githubGetUser( searchResult.login ) );
    dispatch( setUi( EUi.isSearchDialogOpen, false ) );
    dispatch( setUi( EUi.selectedSearchResult, ui.searchPhrase ) );
  }, [ dispatch, ui.searchPhrase ] );

  const error = useSelector( ( state: IAppState ) => getUiSel( state ).error );
  const searchState = useSelector( ( state: IAppState ) => getUiSel( state ).searchState );

  const renderScreenSnap = useCallback( () => {
    const primaryScreen = useScreenSnap( 'Hello', '', helloIcon );
    const searchedFailedScreen = useScreenSnap( error.title, error.msg, errorCrossIcon );
    const resultsNotFoundScreen = useScreenSnap( 'Zero Matches', '', windIcon )
    const searchingScreen = useScreenSnap( 'Searching...', '', binocularsIcon );

    switch ( true ) {
      case ( hasSearchFailed ):
        return <searchedFailedScreen.snap />;
      case ( isSearchStateSearching( searchState ) ):
        return <searchingScreen.snap />
        break;
      case ( isSearchStateNoResults( searchState ) ):
        return <resultsNotFoundScreen.snap />
      default:
        return <primaryScreen.snap />
    }
  }, [ error, hasSearchFailed, searchState ] );
    
  return (
    <Box sx={ { width: '100%', height: '30vh' } }>
      { hasSearchResults 
        ? (
          <List
            width='100%' 
            height={ 300 }
            itemCount={ searchResults.length }
            itemSize={ 100 }
            overscanRowCount={ 5 }
            style={ { overflowX: 'hidden', padding: '15px' } }
          >
            {( { index, style } ) => searchResult( { index, style, onSearchResultClick } )}
          </List>
        )
        : renderScreenSnap()
      }
    </Box>
  )
};

export default SearchResults;
