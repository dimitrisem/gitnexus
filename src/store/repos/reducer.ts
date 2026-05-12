import { reduxPaginationDefault } from '@/constants/redux';
import { IResetAction, ISetGenericAction } from '@/typeDefs';
import update from 'immutability-helper';

import { createReducer } from '@utils';

import { IReposState } from './typeDefs';
import ownTypes from './types';

const defaultState: IReposState = {
  repos:      [],
  fetchState: 'idle',
  pagination: reduxPaginationDefault
}

const initialState: IReposState = { ...defaultState };

const setRepos = ( state: IReposState, { payload }: ISetGenericAction ) => update( state, {
  [ payload.key ]: { $set: payload.value }
} );

const resetRepos = ( state: IReposState, { payload }: IResetAction ) => update( state, {
  [ payload ]: { $set: defaultState[ payload ] }
} );

export const repos = createReducer( initialState, {
  [ ownTypes.SET_REPOS ]:   setRepos,
  [ ownTypes.RESET_REPOS ]: resetRepos,
} ); 
