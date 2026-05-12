import { isDarkTheme } from '@utils';
import { makeStyles } from '@mui/styles';

import { ELayoutLevel } from '@typeDefs';

import { darkBunker, silver } from '@constants/css';

const LoadingScreenStyle = makeStyles( () => ( {
  root: {
    display:         'flex',
    justifyContent:  'center',
    position:        'fixed',
    top:             0,
    left:            0,
    width:           '100%',
    height:          '100%',
    zIndex:          ELayoutLevel.max,
    backgroundColor: ( { uiTheme }: any ) => isDarkTheme( uiTheme ) ? `${darkBunker}` : `${silver} !important`,
    '& #container':  {
      display:       'flex',
      alignItems:    'center',
      flexDirection: 'column',
      width:         '100%',
      position:      'absolute',
      top:           0,
      bottom:        0,
      margin:        'auto',
      height:        'fit-content',
      '& #progress':  {
        margin: '15px 0',
      },
      '& .sk': {
        '&-cube-grid': {
          width:  '50px',
          height: '50px'
        },
      }
    },
    '& #footer': {
      position:         'absolute',
      bottom:           '55px',
      '& #footer-text': {
        textAlign: 'center',
      }
    }
  }
} ) );

export default LoadingScreenStyle
