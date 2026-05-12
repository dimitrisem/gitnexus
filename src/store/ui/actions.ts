import { EUi } from '@typeDefs';

import { ISetUiAction } from './typeDefs';
import ownTypes from './types'

export const setUi = ( key: EUi, value: any ): ISetUiAction => ( {
  type:    ownTypes.SET_UI,
  payload: { key, value }
} );

