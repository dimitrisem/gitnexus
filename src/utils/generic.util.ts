import { IAction } from '@typeDefs';

export const createReducer = ( initialState: any, handlers: any ) =>
  ( state = initialState, action: IAction ) => {
    const createdReducer = handlers.hasOwnProperty( action.type )
      ? handlers[ action.type ]( state, action )
      : state;

    return createdReducer;
  };
