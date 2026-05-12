import { IAction, IStringAction } from '@typeDefs';

import ownTypes from './types'

export const gitHubSearchUser = ( username: string ): IStringAction => ( {
  type:    ownTypes.GITHUB_SEARCH_USER,
  payload: username,
} );

export const gitHubSearchUserSucceeded = ( response ): IStringAction => ( {
  type:    ownTypes.GITHUB_SEARCH_USER_SUCCEEDED,
  payload: response,
} );

export const gitHubSearchUserFailed = (): IAction => ( {
  type: ownTypes.GITHUB_SEARCH_USER_FAILED,
} );

export const githubGetUser = ( username: string ): IStringAction => ( {
  type:    ownTypes.GITHUB_GET_USER,
  payload: username,
} );

export const githubGetUserSucceeded = ( response ): IStringAction => ( {
  type:    ownTypes.GITHUB_GET_USER_SUCCEEDED,
  payload: response,
} );

export const githubGetUserFailed = (): IAction => ( {
  type: ownTypes.GITHUB_GET_USER_FAILED,
} );
