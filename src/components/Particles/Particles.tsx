import { getParticlesConfig } from '@/utils';
import { useCallback, useMemo } from 'react';
import { Particles as ReactParticles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Particles = () => {
  const particlesInit = useCallback( async ( main: any ) => loadFull( main ), [] );
  const particlesOptions = useMemo( () => getParticlesConfig(), [] );

  return (
    <ReactParticles
      init={ particlesInit }
      /* @ts-ignore */
      options={ particlesOptions } // Ensure this function returns a valid config
    />
  );
};

export default Particles;
