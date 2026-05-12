import { getUiThemeAddonSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { Grid } from '@mui/material';
import { m } from 'framer-motion';
import { useSelector } from 'react-redux';

import { bezierButterFramerM, blurInAnim, blurInInit } from '@constants/css';
import { alienIcon, planetsIcon } from '@constants/lordicon';

import { isAbyssalSurferThemeAddon } from '@utils';

import LordIcon from '@components/LordIcon/LordIcon';

interface IScreenSnap {
  lordIconSrc?: string;
  animationDuration?: number;
  animationDelay?: number;
  children?: React.ReactNode;
}

const ScreenSnap = ( {
  lordIconSrc,
  animationDuration = 0.7,
  animationDelay = 0,
  children,
}: IScreenSnap ) => {
  const uiThemeAddon = useSelector( ( state: IAppState ) =>
    getUiThemeAddonSel( state ) );

  const themedLordIconSrc = isAbyssalSurferThemeAddon( uiThemeAddon )
    ? alienIcon
    : lordIconSrc;

  return (
    <Grid
      sx={ {
        position:      'absolute',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        userSelect:    'none',
      } }
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <m.div
        initial={ blurInInit }
        animate={ blurInAnim }
        transition={ {
          duration: animationDuration,
          delay:    animationDelay,
          ease:     bezierButterFramerM,
        } }
      >
        <Grid item>
          {/* @ts-ignore */}
          <LordIcon size='lg' trigger='loop' src={ themedLordIconSrc } />
        </Grid>
      </m.div>

      <Grid item>
        <m.div
          initial={ blurInInit }
          animate={ blurInAnim }
          transition={ { duration: animationDuration, delay: animationDelay, ease: bezierButterFramerM } }
				 >
          {children}
        </m.div>
      </Grid>
				
    </Grid>
  );
};

export default ScreenSnap;
