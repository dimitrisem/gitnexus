import { IAction, IGitHubSearchResult } from '@/typeDefs';

export interface IGitHubUser {
	name: string;
	avatar_url: string;
	login: string;
	location: string;
	bio: string;
	public_repos: number | string;
	followers: number | string;
}

export interface IGitHubSearchResponse {
	total_count: number;
	items: IGitHubSearchResult[];
}

export interface IGitHubGetSucceededAction extends IAction {
	payload: IGitHubSearchResponse;
}
