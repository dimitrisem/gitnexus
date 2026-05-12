import { TSearchState } from '@/typeDefs';

export const isSearchStateIdle = ( searchState: TSearchState ) => searchState === 'idle';
export const isSearchStateSearching = ( searchState: TSearchState ) => searchState === 'searching';
export const isSearchStateNoResults = ( searchState: TSearchState ) => searchState === 'no-results';
