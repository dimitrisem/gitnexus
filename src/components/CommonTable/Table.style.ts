import { isDarkTheme } from '@utils';
import { makeStyles } from '@mui/styles'

import { bezierOne, darkEbonyClay, darkPickledBluewood, mercury, silver, whiteAlto } from '@constants/css'

const TableStyle = makeStyles( () => ( {
  root: {
    '& .virtualized-row, .row': {
      position:             'relative',
      transition:           `background-color .25s ${bezierOne}, transform .25s ${bezierOne}, filter .25s ${bezierOne}, opacity .25s ${bezierOne}`,
      backgroundColor:      ( { uiTheme }: any ) => isDarkTheme( uiTheme ) ? darkPickledBluewood : whiteAlto,
      '&:nth-of-type(odd)': {
        backgroundColor: ( { uiTheme }: any ) => isDarkTheme( uiTheme ) ? darkEbonyClay : mercury,
      },
      '&.disabled': {
        opacity:       '.6 !important',
        pointerEvents: 'none'
      },
      '&.highlight': {
        animation: `highlight 1s ease infinite !important`
      },
      '&.delete': {
        filter:    'blur(5px)',
        transform: 'scale3d(.99, .99, .99)', 
        opacity:   0,
      },
      '&:hover': {
        backgroundColor: ( { uiTheme }: any ) => isDarkTheme( uiTheme ) ? darkEbonyClay : silver,
        transform:       'scale3d(.99, .99, .99)'
      }
    }
  }
} ) );

export default TableStyle;
