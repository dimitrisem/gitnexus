import { IGitHubUser } from '@/store/github/typeDefs';
import update from 'immutability-helper';

import { createReducer } from '@utils';

import { ISetUiAction, IUiState } from './typeDefs';
import ownTypes from './types';

const initialState: IUiState = {
  isLoadingScreenVisible:     false,
  searchPhrase:               '',
  isSearchDialogOpen:         false,
  searchContainerIconTrigger: '',
  selectedSearchResult:       null,
  isUiLoading:                true,
  searchResults:              [],
  selectedUser:               {} as IGitHubUser,
  hasSearchFailed:            false,
  isFetchingUser:             false,
  searchState:                'idle',
  error:                      {
    title: '',
    msg:   '',
  },
  uiTheme:                  'dark',
  uiThemeAddon:             '',
  selectedRepoDescription:  '',
  isDescriptionDisplayOpen: false,
};

const setUi = ( state: IUiState, { payload }: ISetUiAction ) => update( state, {
  [ payload.key ]: { $set: payload.value }
} );

export const ui = createReducer( initialState, {
  [ ownTypes.SET_UI ]: setUi,
} );
