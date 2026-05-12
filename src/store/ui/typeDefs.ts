import { IGitHubUser } from '@/store/github/typeDefs';
import { IAction, EUi, IGitHubSearchResult, IError, TSearchState, TUiTheme, TUiThemeAddon } from '@typeDefs';

/* States... */
export type TFetchState = 'idle' | 'fetching' | 'fetched';

export interface IUiState {
	isLoadingScreenVisible: boolean;
	searchPhrase: string;
	isSearchDialogOpen: boolean;
	searchContainerIconTrigger: string;
	selectedSearchResult: string | null;
	isUiLoading: boolean;
	searchResults: IGitHubSearchResult[];
	selectedUser: IGitHubUser;
	hasSearchFailed: boolean;
	isFetchingUser: boolean;
	error: IError;
	searchState: TSearchState;
	uiTheme: TUiTheme;
	uiThemeAddon: TUiThemeAddon;
	isDescriptionDisplayOpen: boolean;
	selectedRepoDescription: string;
}

/* Actions... */
export interface ISetUiAction extends IAction {
  payload: {
		key: EUi;
		value: any;
	};
}

export interface IGitHubSearchUserSucceededAction extends IAction {
	payload: IGitHubSearchResult[];
}

export interface IGitHubGetUserSucceededAction extends IAction {
	payload: IGitHubUser[];
}
