import { Box, Grid, Popover, Typography } from '@mui/material';
import { usePopover } from '@vendor/MuiMinimal/components/custom-popover';
import React, { useMemo } from 'react';

import { questionIcon } from '@constants/lordicon';

import LordIcon from '@components/LordIcon/LordIcon';

interface ICustomPopover {
	popover: ReturnType<typeof usePopover>;
	title: string;
	body: string | React.ReactNode;
	anchorOrigin?: any;
  transformOrigin?: any;
	lordIconSrc: string;
}

const CustomPopover = ( props: ICustomPopover ) => {
  const { 
    title, 
    body, 
    popover,
    anchorOrigin = { 
      vertical:   'top',
      horizontal: 'center',
    },
    transformOrigin = {
      vertical:   'bottom',
      horizontal: 'center',
    },
    lordIconSrc = questionIcon,
  } = props;
	
  const memoizedOpen = useMemo( () => Boolean( popover.open ), [ popover.open ] );

  return (
    <Popover
      open={ memoizedOpen }
      anchorEl={ popover.open }
      anchorOrigin={ anchorOrigin }
      transformOrigin={ transformOrigin }
      onClose={ popover.onClose }
      disableRestoreFocus
      sx={ {
        pointerEvents: 'none',
      } }
    >
      <Grid alignItems='center'>
        { lordIconSrc && (
          <Grid item>
            <LordIcon 
              trigger='loop' 
              src={ lordIconSrc } 
            />
          </Grid>
        ) }

        <Grid item>
          <Box p={ 2 } sx={ { maxWidth: '350px' } }>
            <Typography variant='subtitle1' gutterBottom>
              { title }
            </Typography>
            <Typography variant='body2' gutterBottom>
              { body }
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default CustomPopover;
