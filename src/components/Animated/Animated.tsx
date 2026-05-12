import { useEffect, useState, useCallback, memo } from 'react';

import { IRestProps, TAnimationDelays, TAnimations } from '@typeDefs';

interface IAnimated {
	enter?: boolean;
	exit?: boolean;
	enterAnimation?: TAnimations;
  exitAnimation?: TAnimations;
	enterDelay?: number;
  exitDelay?: number;
	enterDuration?: TAnimationDelays
	exitDuration?: TAnimationDelays
  children: ( props: any ) => JSX.Element;
}

type TAnimated = IAnimated & IRestProps;

export const Animated = memo( ( props: TAnimated ) => {
  const {
    enter = true,
    exit = false,
    enterAnimation,
    exitAnimation,
    enterDelay = 0,
    exitDelay = 0,
    enterDuration = '',
    exitDuration = '',
    children,
    ...rest
  } = props;
  const animatedClass = 'animated';
  const animationString = `${animatedClass} ${enter ? enterDuration : exitDuration}`
  const [ animationClass, setAnimationClass ] = useState( `${animationString} ${enterAnimation}` );
  const [ enterDelayPassed, setEnterDelayPassed ] = useState( false );
  const [ exitDelayPassed, setExitDelayPassed ] = useState( false );
  const runAnimation = () => setAnimationClass( `${animationString} ${enterAnimation}` );
  const runAnimationReverse = () => setAnimationClass( `${animationString} ${exitAnimation}` );
	
  const init = useCallback( () => {
    const enterDelayTimer = setTimeout( () => {
      setEnterDelayPassed( true );
      enter && runAnimation();
    }, enterDelay );
	
	  const exitDelayTimer = setTimeout( () => {
      setExitDelayPassed( true )
      exit && runAnimationReverse();
    } );

	 return () => {
		 clearTimeout( enterDelayTimer );
		 clearTimeout( exitDelayTimer );
	 }
  }, [ enter, exit, enterDelay, exitDelay ] );

  useEffect( () => {
    init();
  }, [ animationClass, enter, exit, enterAnimation, exitAnimation, enterDelay, exitDelay ] );

  return ( enter || exit ) && ( enterDelayPassed || exitDelayPassed )
    ? children( {
      ...rest,
      className: animationClass,
    } )
    : null;
} );

