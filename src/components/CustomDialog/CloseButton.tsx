import { Button } from '@mui/material';
import { memo } from 'react';

import { IClassName } from '@typeDefs';

import { mercury } from '@constants/css';
// @ts-ignore
import { errorCrossIcon } from '@constants/lordicon';

import { ICustomDialog } from '@components/CustomDialog';
import GlassFx from '@components/GlassFx/GlassFx';
import LordIcon from '@components/LordIcon/LordIcon';

import { useGlassFx } from '@hooks/useGlassFx';

type TCloseButton = IClassName & Partial<ICustomDialog>

const CloseButton = ( props: TCloseButton ) => {
  const { className, setIsOpen } = props;
  const glassFx = useGlassFx();
	
  return (
  /* @ts-ignore */
    <Button
      id='custom-dialog-close-button'
      className={ `${className} ${ glassFx.glassFxChildClass }` }
      onMouseEnter={ glassFx.onGlassMouseEnter }
      variant='contained'
      color='primary'
      onClick={ setIsOpen }
      ref={ glassFx.ref }
      startIcon={
        <LordIcon 
          src={ errorCrossIcon }
          trigger='loop-on-hover'
          colors={ `primary:#fff,secondary:${mercury}` }
          style={ { width: '35px', height: '35px' } } />
      }
    >
      Close
      <GlassFx useGlassFx={ glassFx } />
    </Button>
  );
};

export default memo( CloseButton );
