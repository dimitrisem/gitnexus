import { makeStyles } from '@mui/styles';

import { ELayoutLevel } from '@typeDefs';

/* @ts-ignore */
const OverlayStyle = makeStyles( () => ( {
  root: {
    position:           'absolute',
    top:                ( { top }: any ) => top,
    bottom:             ( { bottom }: any ) => bottom,
    left:               ( { left }: any ) => left,
    right:              ( { right }: any ) => right,
    width:              ( { width }: any ) => width,
    height:             ( { height }: any ) => height,
    margin:             ( { margin }: any ) => margin,
    padding:            ( { padding }: any ) => padding,
    opacity:            .5,
    zIndex:             ELayoutLevel.high,
    backgroundColor:    'rgba(33, 45, 54, .5) !important',
    '&.center-content': {
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
    },
    '&.is-hidden':  {
      display: 'none',
    },
  }
} ) )

export default OverlayStyle;
