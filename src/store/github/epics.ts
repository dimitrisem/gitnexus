import store from '@/store/createStore';
import { IGitHubSearchUserSucceededAction, setUi } from '@/store/ui';
import { EUi, IAppState, IStringAction } from '@/typeDefs';
import { ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, switchMapTo, tap } from 'rxjs/operators';

import GitHubApiHelper from '@helpers/gitHubApi.helper';

import ownTypes from './types';
import { IGitHubUser } from '@/store/github/typeDefs';
import { getRepos, getReposSel } from '@/store/repos';

/* Search... */
export const searchGitHubUserEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_SEARCH_USER ),
  tap( ( { payload: username }: IStringAction ) => {
    const gitHubApiHelper = new GitHubApiHelper();
    gitHubApiHelper.searchAsync( username );
  } ),
  map( () => setUi( EUi.hasSearchFailed, false ) ),
);

export const searchGitHubUserSucceededEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_SEARCH_USER_SUCCEEDED ),
  tap( ( { payload: gitHubSearchResponse } ) => {
    store.dispatch( setUi( EUi.searchState, 'idle' ) );
    store.dispatch( setUi( EUi.searchResults, gitHubSearchResponse.items ) );
    if ( gitHubSearchResponse.items.length <= 0 ) store.dispatch( setUi( EUi.searchState, 'no-results' ) );
  } ),
  switchMapTo( EMPTY )
);

export const searchGitHubUserSucceededOrFailedEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_SEARCH_USER_SUCCEEDED, ownTypes.GITHUB_SEARCH_USER_FAILED ),
  tap( () => store.dispatch( setUi( EUi.searchContainerIconTrigger, '' ) ) ),
  switchMapTo( EMPTY )
);

export const searchGitHubUserFailedEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_SEARCH_USER_FAILED ),
  mergeMap( () => of(
    setUi( EUi.searchResults, [] ),
    setUi( EUi.searchState, 'idle' ),
    setUi( EUi.hasSearchFailed, true ),
  ) )
);

/* Get... */
export const getGitHubUserEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_GET_USER ),
  tap( ( { payload: username }: IStringAction ) => {
    store.dispatch( setUi( EUi.isFetchingUser, true ) );

    const selectedUser: IGitHubUser = {
      avatar_url:   'N/A',
      bio:          'N/A',
      followers:    0,
      location:     'N/A',
      name:         'N/A',
      public_repos: 0,
      login:        username,
    };

    store.dispatch( setUi( EUi.selectedUser, selectedUser ) );
		
    const gitHubApiHelper = new GitHubApiHelper();
    gitHubApiHelper.readAsync( username );
  } ),
  switchMapTo( EMPTY ),
);

export const getGitHubUserSucceededEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_GET_USER_SUCCEEDED ),
  map( ( { payload: gitHubUser }: IGitHubSearchUserSucceededAction ) => {
    const formattedUser = {} as IGitHubUser;
    store.dispatch( setUi( EUi.isFetchingUser, false ) );
    store.dispatch( getRepos() );
    Object.entries( gitHubUser ).forEach( ( [ key, value ] ) => {
      formattedUser[ key ] = value || 'N/A'
    } );

    return setUi( EUi.selectedUser, formattedUser );
  } ),
);

export const getGitHubUserSucceededOrFailedEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GITHUB_GET_USER_SUCCEEDED, ownTypes.GITHUB_GET_USER_FAILED ),
  map( () => setUi( EUi.isFetchingUser, false ) ),
);
