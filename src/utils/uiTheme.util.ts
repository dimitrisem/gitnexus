import { TUiTheme, TUiThemeAddon } from '@/typeDefs';

export const isDarkTheme = ( uiTheme: TUiTheme ) => uiTheme === 'dark';
export const isLightTheme = ( uiTheme: TUiTheme ) => uiTheme === 'light';
export const isAbyssalSurferThemeAddon = ( uiThemeAddon: TUiThemeAddon ) => uiThemeAddon === 'abyssal-surfer';
export const isDoomedLanternTheme = ( uiThemeAddon: TUiThemeAddon ) => uiThemeAddon === 'doomed-lantern'
