import { IAppState } from '@/typeDefs';
import { getUiThemeSel } from '@store/ui';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux'

import GlassFxStyle from '@components/GlassFx/GlassFx.style';

import { useScreenSnap } from '@hooks/useScreenSnap';

export interface IGlassFxCallback {
	glassClass: string;
	glassFxChildClass: string;
	onGlassMouseEnter: ( e: React.ChangeEvent<MouseEvent> ) => void;
	onGlassTransitionEnd: ( e: any ) => void;
	ref: any;
}

export const useGlassFx = ( initDelay = 0, shineOnInit = false, width: number = 80 ): IGlassFxCallback => {
  const [ height, setHeight ] = useState( 150 );
  const [ top, setTop ] = useState( 0 );
  const [ left, setLeft ] = useState( 0 );
  const [ translateX, setTranslateX ] = useState( 0 );
  const [ hasMouseEntered, setHasMouseEntered ] = useState( false );
  const onGlassMouseEnter = useCallback( () => setHasMouseEntered( true ), [] );
  const onGlassTransitionEnd = useCallback( () => setHasMouseEntered( false ), [] );
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const { glassClass, glassFxChildClass, hasMouseEnteredClass } = GlassFxStyle( { top, left, width, height, translateX, uiTheme } );
  const targetElRef = useRef( null );
  
  const ownClass = useMemo( () => classNames( {
    [ hasMouseEnteredClass ]: hasMouseEntered || shineOnInit,
  } ), [ hasMouseEntered, onGlassMouseEnter, onGlassTransitionEnd ] );

  useEffect( () => {
    if ( targetElRef ) {
      setTimeout( () => {
        try {
          const targetEl = targetElRef.current;
          /* @ts-ignore */
          const { width: targetElWidth, height: targetElHeight } = targetEl.getBoundingClientRect();
          const calculatedHeight = targetElHeight * 8;
          const calculatedTop = calculatedHeight / 2;
          const calculatedLeft = width / 3;
          const calculatedTranslateX = targetElWidth + 50;
          setTop( -calculatedTop );
          setLeft( -calculatedLeft );
          setHeight( calculatedHeight );
          setTranslateX( calculatedTranslateX );
        } catch( e ) {
        // console.error( `GlassFx: Unable to find "${targetElSelector}"` );
        }
      }, initDelay )
    }
  }, [] );
	
  return { 
    glassClass: `${ownClass} ${glassClass}`, 
    glassFxChildClass,
    onGlassMouseEnter,
    onGlassTransitionEnd,
    ref:        targetElRef,
	 };
}
