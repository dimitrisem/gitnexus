import { gitHubSearchUser } from '@/store/github';
import { getUiSel, setUi } from '@/store/ui';
import { EUi, IAppState } from '@/typeDefs';
import { isSearchStateSearching } from '@/utils';
import { TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchInput = () => {
  const searchState = useSelector( ( state: IAppState ) => getUiSel( state ).searchState );
  const searchContainerIconTrigger = useSelector( ( state: IAppState ) => getUiSel( state ).searchContainerIconTrigger );
  const [ inputValue, setInputValue ] = useState( '' );
  const dispatch = useDispatch();

  const debouncedSearch = debounce( ( githubUsername: string ) => {
    dispatch( gitHubSearchUser( githubUsername ) );
  }, 1500 );

  const onInputChange = useCallback( ( e ) => {
    const githubUsername = e.target.value;
    setInputValue( githubUsername );

    if ( githubUsername ) {
      if ( !isSearchStateSearching( searchState ) ) dispatch( setUi( EUi.searchState, 'searching' ) );
      if ( searchContainerIconTrigger === '' ) dispatch( setUi( EUi.searchContainerIconTrigger, 'loop' ) );
      debouncedSearch( githubUsername );
    }
  }, [ searchState, searchContainerIconTrigger ] );

  return (
    <TextField
      label='Username'
      variant='standard'
      onChange={ onInputChange }
      value={ inputValue }
      InputProps={ {
        sx: {
          width: '200px'
        },
      } }
    />
  );
}

export default SearchInput;
