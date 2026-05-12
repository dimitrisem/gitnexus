import { TFetchState } from '@store/ui';

/* Fetch State... */
export const isFetchStateIdle = ( fetchState: TFetchState ): boolean => fetchState === 'idle';
export const isFetchStateFetching = ( fetchState: TFetchState ): boolean => fetchState === 'fetching';
export const isFetchStateFetched = ( fetchState: TFetchState ): boolean => fetchState === 'fetched';
