import { makeStyles } from '@mui/styles'

const CustomDialogStyle = makeStyles( ( {
  root: {
    padding:              '24px',
    '& .title-container': {
      marginRight: '20px',
      whiteSpace:  'nowrap',
    },
    '& .toggle-indicator-containers': {
      marginLeft:                    'auto',
      '& .indicator-container-chip': {
        marginRight: '10px', 
        fontSize:    '10px' 
      }
    }
  }
} ) );

export default CustomDialogStyle;
