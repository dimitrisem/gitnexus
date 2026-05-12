import { setUi } from '@store/ui';
import { useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';

import { EUi } from '@typeDefs';

interface ICustomDialogEventListeners {
	targetDialog: EUi;
	closeOnEnter?: boolean
	closeOnClick?: boolean
	closeOnEsc?: boolean;
} 

const CustomDialogEventListeners = ( props: ICustomDialogEventListeners ) => {
  const {  
    targetDialog,
    closeOnEnter = true,
    closeOnClick = true,
    closeOnEsc = true,
  } = props;
  const dispatch = useDispatch();

  const keyUpEventListener = useCallback(
    ( e ) => {
      if ( ( closeOnEsc && e.code === 'Escape' ) || ( closeOnEnter && e.code.includes( 'Enter' ) ) ) {
        dispatch( setUi( targetDialog, false ) );
      }
    },
    [ setUi ]
  );

  const clickEventListener = useCallback(
    ( e ) => {
      if ( closeOnClick ) {
        if ( !e.target.closest( '.MuiDialog-container .MuiPaper-root' ) ) {
          dispatch( setUi( targetDialog, false ) );
        }
      }
    },
    [ setUi ]
  );

  useEffect( () => {
    if ( targetDialog ) {
      document.addEventListener( 'keyup', keyUpEventListener, true );
      document.addEventListener( 'click', clickEventListener, true );
    } else {
      document.removeEventListener( 'keyup', keyUpEventListener, true );
      document.removeEventListener( 'click', clickEventListener, true );
    }

    return () => {
      document.removeEventListener( 'keyup', keyUpEventListener, true );
      document.removeEventListener( 'click', clickEventListener, true );
    };
  }, [ targetDialog, keyUpEventListener, clickEventListener ] );

  return null;
};

export default memo( CustomDialogEventListeners );
