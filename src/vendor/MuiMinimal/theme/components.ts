import { bezierButter, turquoiseBlue } from '@constants/css';
import { display } from '@mui/system';
/* @ts-ignore */
import cyanBlurImg from '@vendor/MuiMinimal/assets/imgs/cyan-blur.png'
/* @ts-ignore */
import redBlurImg from '@vendor/MuiMinimal/assets/imgs/red-blur.png'

export default {
	MuiTable: {
		styleOverrides: {
			root: {
				'& td': {
					textAlign: 'right'
				}
			},
		}
	},
	MuiCard: {
		styleOverrides: {
 			root: {
				backgroundImage: `url(${cyanBlurImg}), url(${redBlurImg})`,
				backgroundRepeat: 'no-repeat, no-repeat',
				backgroundPosition: 'top right, left bottom',
				backgroundSize: '50%, 50%',
 			}
		}
	},
  MuiDivider: {
    styleOverrides: {
      root: {
        height:          '3px', 
        width:           '55px', 
        backgroundColor: turquoiseBlue 
      }
    },
  },
  MuiGrid: {
    styleOverrides: {
      root: {
        display: 'flex',
      }
    }
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        'label': {
          marginRight: '10px'
        }
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        width: '100%',
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        '& .MuiButton-root': {
          marginRight: '0',
          marginLeft:  'auto'
        }
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        '& .MuiAlert-icon': {
          display: 'none'
        }
      }
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
				width: 'fit-content',
        '& lord-icon[disabled="true"]': {
          opacity:       '.5',
          pointerEvents: 'none',
					filter: 'grayscale(1)',
        },
        '& .label': {
          whiteSpace: 'unset'
        },
				'&.disabled': {
					transform: 'scale3d(.9, .9, .9) !important',
					pointerEvents: 'none',
					filter: 'grayscale(1)',
					opacity: .5,
				},
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      root: {
				zIndex: '100 !important',
        '& .MuiTypography-root': {
          padding: 0,
        },
        willChange:                 'transform, opacity',
				'& .MuiDialogContent-root': { 
					overflow: 'hidden !important',
					maxWidth: 'calc(-60px + 100vw)',
					maxHeight: 'calc(-60px + 100vh)',
				},
        '& .MuiDialogActions-root': { overflow: 'hidden' },
        '&.enter':                  {
          '& .MuiPaper-root': {
            animation:           `butter-zoom-in .2s ${bezierButter} both`,
            '& .MuiButton-root': {
              animation:      `slide-in-down .10s ${bezierButter} both`,
              animationDelay: '.25s',
            }
          }
        },
        '&.exit': {
					'& .MuiDialogContent-root': { 
						overflowX: 'hidden !important',
						overflowY: 'hidden !important',
					 },
          '& .MuiPaper-root': {
            animation: `rotate-out-down .3s ${bezierButter} both`,
          }
        }
      }
    }
  }
}
