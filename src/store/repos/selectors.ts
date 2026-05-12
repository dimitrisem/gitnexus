import { IAppState } from '@typeDefs';

export const getReposSel = ( state: IAppState ) => state.repos;
export const getReposFetchStateSel = ( state: IAppState ) => getReposSel( state ).fetchState;
export const hasReposSel = ( state: IAppState ) => getReposSel( state ).repos.length > 0;
