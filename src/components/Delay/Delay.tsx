import { useState, useEffect, useCallback, memo } from 'react';

interface IDelay {
	children: React.ReactNode;
	enterDelay?: number;
	exitDelay?: number;
}

const Delay = memo( ( { children, enterDelay = 1, exitDelay = 0 }: IDelay ) => {
  const [ shouldRender, setShouldRender ] = useState( false );

  const toggleRenderOnDelay = useCallback( ( shouldRender: boolean, delay ) => {
    const timer = setTimeout( () => setShouldRender( shouldRender ), delay );
    return timer;
  }, [] );

  useEffect( () => {
    const enterTimer = toggleRenderOnDelay( true, enterDelay );
    return () => clearTimeout( enterTimer );
  }, [ enterDelay ] );

  useEffect( () => {
    const exitTimer = toggleRenderOnDelay( false, exitDelay );
    return () => clearTimeout( exitTimer );
  }, [ exitDelay ] );

  return shouldRender ? <> { children } </> : null;
} );

export default Delay;
