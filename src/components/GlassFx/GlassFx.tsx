import { memo } from 'react'

import { IGlassFxCallback } from '@hooks/useGlassFx';

interface IGlassFx {
	useGlassFx: IGlassFxCallback;
	animateInfinite?: boolean;
}

const GlassFx = ( props: IGlassFx ) => {
  const { useGlassFx } = props;
  const { glassClass, onGlassTransitionEnd } = useGlassFx;
  
  return <div onTransitionEnd={ onGlassTransitionEnd } className={ glassClass } />
};

export default memo( GlassFx );
