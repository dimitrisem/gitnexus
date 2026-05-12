import { ERepos, IReposState } from '@/store/repos/typeDefs';
import { IUiState } from '@/store/ui';

/* Redux... */
export interface IAppState {
	ui: IUiState;
	repos: IReposState;
}

export interface IStore {
  value: IAppState;
}

export interface ISetGenericAction extends IAction {
	payload: {
		key: string,
		value: string
	};
}

export interface IAction {
  type: string;
}

export interface IStringAction extends IAction {
  payload: string;
}

export interface IBooleanAction extends IAction {
  payload: boolean;
}

export interface INumberAction extends IAction {
  payload: number;
}

export interface IErrorAction extends IAction {
	payload: IError
}

export interface IError {
	title: string;
	msg: string;
}

export enum EUi {
	isLoadingScreenVisible = 'isLoadingScreenVisible',
	searchPhrase = 'searchPhrase',
	isSearchDialogOpen = 'isSearchDialogOpen',
	searchContainerIconTrigger = 'searchContainerIconTrigger',
	searchResults = 'searchResults',
	selectedSearchResult = 'selectedSearchResult',
	isUiLoading = 'isUiLoading',
	selectedUser = 'selectedUser',
	hasSearchFailed = 'hasSearchFailed',
	searchState = 'searchState',
	isFetchingUser = 'isFetchingUser',
	error = 'error',
	uiTheme = 'uiTheme',
	uiThemeAddon = 'uiThemeAddon',
	isDescriptionDisplayOpen = 'isDescriptionDisplayOpen',
	selectedRepoDescription = 'selectedRepoDescription',
}

export interface IReduxPaginationModel {
	perPage: number;
	page: number;
}

export interface IReduxPagination {
	first: IReduxPaginationModel;
	prev: IReduxPaginationModel;
	last: IReduxPaginationModel;
	next: IReduxPaginationModel;
	total: number;
}

export interface IResetAction extends IAction {
	payload: ERepos;
}

/* Models... */
export interface IGitHubSearchResult {
	login: string;
	avatar_url: string;
}

export interface IFetchData {
	response: any;
	json: any;
}

export type TJson = Record<string, any>;

/* Components... */
export interface IRestProps {
	[key: string]: any;
}

export interface IChildren {
	children?: React.ReactNode;
}

export interface IClassName {
	className?: string;
}

export interface INavItem {
	title: string;
	path: string;
	icon?: JSX.Element;
	hidden?: boolean;
	children?: Array<INavItem>;
};

export interface IPagination {
	pagination: IReduxPagination;
	dataCount: number;
	dataGetterFunction: ( pagination: IReduxPagination ) => void;
}

export type TAlertSeverity = 'info' | 'warning' | 'error' | 'success';

export interface ISearchResultItem {
  title: string;
  description: string;
  keywords: string[];
}

export type TSize = 'sm' 
	| 'default' 
	| 'md' 
	| 'lg' 
	| 'xl' 
	| 'xxl'
	| 'custom';

export interface ICustomSize {
	width: number;
	height: number;
}

/* Animations... */
export type TAnimationDelays = ''
| 'rapid' 
| 'quick' 
| 'normal' 
| 'slow' 
| 'very-slow'
| 'super-slow'
| 'ultra-slow'
| 'duper-slow'
| 'legend-slow'
| 'super-legend-slow'
| 'max-slow';

export type TAnimations = ''
| 'scale-in' 
| 'slide-up'
| 'slide-in-up'
| 'slide-down' 
| 'slide-in-down'
| 'blur-out'
| 'grow-out'
| 'land-in';

/* Misc... */
export enum ELayoutLevel {
	negative = -1,
	zero = 0,
	low,
	default,
	high,
	veryHigh,
	max
};

export type TFetchRequestMethod = 'get' | 'post' | 'put';
export type TSearchState = 'idle' | 'searching' | 'no-results';
export type TApiHelperRequestName = 
  | ''
	| 'getUser'
	| 'searchUser'
	| 'getRepos'

export type TUiTheme = 'dark' | 'light';
export type TUiThemeAddon = '' | 'abyssal-surfer' | 'doomed-lantern';
