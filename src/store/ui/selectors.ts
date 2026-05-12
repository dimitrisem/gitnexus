import { IAppState } from '@typeDefs';

export const getUiSel = ( state: IAppState ) => state.ui;
export const hasSelectedUserSel = ( state: IAppState ) => Object.keys( getUiSel( state ).selectedUser ).length > 0;
export const hasSearchResultsSel = ( state: IAppState ) => Object.keys( getUiSel( state ).searchResults ).length > 0;
export const hasErrorSel = ( state: IAppState ) => !!getUiSel( state ).error.msg;
export const getUiThemeSel = ( state: IAppState ) => getUiSel( state ).uiTheme;
export const getUiThemeAddonSel = ( state: IAppState ) => getUiSel( state ).uiThemeAddon;
