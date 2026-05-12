import { TFetchState } from '@store/ui';
import { IAction, IError, IReduxPagination } from '@typeDefs';

/* States */
export interface IReposState {
	repos: Array<IRepo>
	fetchState: TFetchState;
	pagination: IReduxPagination;
}

export interface IGetReposResponse extends IError {
	repos: Array<IRepo>;
	reposCount: number;
}

/* Models... */
export interface IRepo {
	full_name: string;
	description: string;
	owner: {
		starred_url: string;
	}
	stars: number;
}

export enum ERepos {
	repos = 'repos',
	reposCount = 'reposCount',
	fetchState = 'fetchState',
	pagination = 'pagination',
}

/* Actions... */
export interface IGetReposSucceededOrFailedAction extends IAction {
	payload: { repos?: Array<IRepo>, reposCount: number };
}

export interface IGetReposAction extends IAction {
	payload: IReduxPagination;
}
