import { IAction, IReduxPagination, IResetAction, ISetGenericAction } from '@typeDefs';

import { ERepos, IGetReposAction, IGetReposResponse, IGetReposSucceededOrFailedAction } from './typeDefs';
import ownTypes from './types'

export const setRepos = ( key: ERepos, value: any ): ISetGenericAction => ( {
  type:    ownTypes.SET_REPOS,
  payload: { key, value }
} );

export const resetRepos = ( key: ERepos ): IResetAction => ( {
  type:    ownTypes.RESET_REPOS,
  payload: key,
} );

export const getRepos = (): IAction => ( {
  type: ownTypes.GET_REPOS,
} );

export const getReposSucceeded = ( usersResponse: IGetReposResponse ): IGetReposSucceededOrFailedAction => ( {
  type:    ownTypes.GET_REPOS_SUCCEEDED,
  payload: usersResponse
} );

export const getReposFailed = (): IAction => ( {
  type: ownTypes.GET_REPOS_FAILED,
} );
