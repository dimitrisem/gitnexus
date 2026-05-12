import { makeStyles } from '@mui/styles'

const InfoButtonStyle = makeStyles( () => ( {
  root: {
    '&.disabled': {
      pointerEvents: 'none',
      filter:        'grayscale(100%)'
    }
  }
} ) )
	
export default InfoButtonStyle;
