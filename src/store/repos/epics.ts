import { ofType } from 'redux-observable';
import { concat, EMPTY, of } from 'rxjs';
import { map, mergeMap, switchMapTo, tap } from 'rxjs/operators';

import ownTypes from './types';
import { ERepos, IGetReposAction } from '@store/repos/typeDefs';
import { resetRepos, setRepos } from '@store/repos/actions';
import ReposApiHelper from '@helpers/reposApi.helper';
import { getReposSel } from '@store/repos/selectors';
import { IStore } from '@typeDefs';
import store from '@store/createStore';

/* Get Repos... */
export const getReposEpic = ( action$, appStore: IStore ) => action$.pipe(
  ofType( ownTypes.GET_REPOS ),
  mergeMap( ( action: IGetReposAction ) => concat(
    of( setRepos( ERepos.fetchState, 'fetching' ) ).pipe(),
    of( action ).pipe(
      tap( () => {
        const pagination = getReposSel( appStore.value ).pagination;
        const reposApiHelper = new ReposApiHelper();
        store.dispatch( resetRepos( ERepos.pagination ) )
        reposApiHelper.readAsync( pagination.next.perPage, pagination.next.page -1 ) 
      } ),
      switchMapTo( EMPTY )
    ),
  ) )
);

export const getReposSucceededEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GET_REPOS_SUCCEEDED ),
  map( ( { payload: repos } ) => {
    const formattedRepos = repos.map( ( repo ) => ( {
      ...repo,
      description: repo.description || 'N/A'
    } ) );
    return setRepos( ERepos.repos, formattedRepos ) 
  } ),
);

export const getReposSucceededOrFailedEpic = ( action$ ) => action$.pipe(
  ofType( ownTypes.GET_REPOS_SUCCEEDED, ownTypes.GET_REPOS_FAILED ),
  map( () => setRepos( ERepos.fetchState, 'fetched' ) ),
);
