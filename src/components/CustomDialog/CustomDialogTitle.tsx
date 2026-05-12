import CustomDialogStyle from '@/components/CustomDialog/CustomDialog,style';
import { fadeInAnim, fadeInInit } from '@/constants/css';
import { Box, Chip, DialogTitle, Grid, Typography } from '@mui/material';
import { usePopover } from '@vendor/MuiMinimal/components/custom-popover';
import { m } from 'framer-motion';
import { memo } from 'react';

import { enterKeyIcon, errorCrossIcon, escKeyIcon, mouseLeftClickIcon } from '@constants/lordicon';

import CustomPopover from '@components/CustomPopover/CustomPopover';
import LordIcon from '@components/LordIcon/LordIcon';

export interface ICustomDialogTitle {
	isOpen: boolean;
	setIsOpen: ( isOpen: boolean ) => void;
	title: string;
	enterDelay?: number;
	closeOnEnter?: boolean;
	closeOnClick?: boolean;
	closeOnEsc?: boolean;
}

const CustomDialogTitle = ( props: ICustomDialogTitle ) => {
  const {
    setIsOpen,
    isOpen,
    title,
    enterDelay,
    closeOnEnter = true,
    closeOnClick = true,
    closeOnEsc = true,
  } = props;
  const escKeyPopover = usePopover();
  const clickPopover = usePopover();
  const enterPopover = usePopover();
	
  return (
    <Box className={ CustomDialogStyle().root }>
      { closeOnEnter && (
        <CustomPopover
          title='[ ENTER ]'
          body='Close dialog by pressing the "Enter" key.'
          popover={ enterPopover }
          lordIconSrc={ enterKeyIcon }
        />
      ) }
	
      { closeOnClick && (
        <CustomPopover
          title='[ Click ]'
          body='Close dialog by clicking anywhere.'
          popover={ clickPopover }
          lordIconSrc={ mouseLeftClickIcon }
        />
      ) }
	
      { closeOnEsc && (
        <CustomPopover
          title='[ ESC ]'
          body='Close dialog by pressing the "Esc" key.'
          popover={ escKeyPopover }
          lordIconSrc={ escKeyIcon }
        />
      ) }

      <DialogTitle>
        <m.div
          initial={ fadeInInit }
          animate={ fadeInAnim }
          transition={ { duration: 0.5, delay: enterDelay } }
        >
          <Grid alignItems='center'>
            <Grid item className='title-container'>
              <Typography variant='h5'>
                { title }
              </Typography>
            </Grid>

            <Grid item className='toggle-indicator-containers' flexDirection='row-reverse' alignItems='center'>
              { closeOnEnter && (
                <Grid item order={ 0 }>
                  <Chip 
                    label='[ ENTER ]'
                    color='primary'
                    className='indicator-container-chip'
                    onMouseEnter={ enterPopover.onOpen }
                    onMouseLeave={ enterPopover.onClose }
                  />
                </Grid>
              ) }

              { closeOnClick && (
                <Grid item order={ -1 }>
                  <Chip 
                    label='[ CLICK ]'
                    color='primary'
                    className='indicator-container-chip'
                    onMouseEnter={ clickPopover.onOpen }
                    onMouseLeave={ clickPopover.onClose }
                  />
                </Grid>
              ) }

              { closeOnEsc && (
                <Grid item order={ -2 }>
                  <Chip 
                    label='[ ESC ]'
                    color='primary'
                    className='indicator-container-chip'
                    onMouseEnter={ escKeyPopover.onOpen }
                    onMouseLeave={ escKeyPopover.onClose }
                  />
                </Grid>
              ) }

              <Grid item order={ -3 }>
                <LordIcon
                  src={ errorCrossIcon }
                  trigger='loop-on-hover'
                  style={ { width: '35px', height: '35px' } } 
                  onClick={ () => setIsOpen( !isOpen ) }
                />
              </Grid>
            </Grid>
          </Grid>
        </m.div>
      </DialogTitle>
    </Box>
  )
}

export default memo( CustomDialogTitle );
