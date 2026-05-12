import { useEffect } from 'react';

export const useAllTransition = () => {
  const browserPaintTimeout = 200;

  useEffect( () => {
    setTimeout( () => {
      document.body.classList.add( 'use-all-transition' );
    },browserPaintTimeout )

    return () => {
      setTimeout( () => {
        document.body.classList.remove( 'use-all-transition' );
      },browserPaintTimeout )
    };
  }, [] );
}
