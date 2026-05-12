import { isDarkTheme } from '@utils';
import { bezierOne } from '@constants/css';
import { makeStyles } from '@mui/styles';

import { ELayoutLevel } from '@typeDefs';

/* @ts-ignore */
const GlassFxStyle = makeStyles( () => ( {
  glassClass: {
    position:        'absolute',
    top:             ( { top }: any ) => `${top}px`,
    left:            ( { left }: any ) => `${left}px`,
    width:           ( { width } ) => `${width}px`,
    height:          ( { height } ) => `${height}px`,
    transform:       'rotate3d(0, 0, 1, 45deg) translate3d(0, 0, 0)',
    transition:      `transform 1s ${bezierOne}`,
    background:      ( { uiTheme } ) => isDarkTheme( uiTheme ) 
      ? `linear-gradient(90deg, #ffffff00, #ffffff54, #ffffff00)` 
      : 'linear-gradient(90deg, #ffffff00, white, #ffffff00)',
    zIndex:          ELayoutLevel.negative,
    opacity:         0,
    willChange:      'transform',
  },
  glassFxChildClass: {
    transition: `transform .25s ${bezierOne} !important`,
    position:   'relative !important',
    overflow:   'hidden !important',
    '&:hover':  {
      transform: 'scale3d(1.1, 1.1, 1.1) !important',
    }
  },
  hasMouseEnteredClass: {
    opacity:   1,
    transform: ( props: { translateX: number } ) => `rotate3d(0, 0, 1, 45deg) translate3d(${props.translateX}px, 0, 0)`,
  }
} ) );

export default GlassFxStyle;
