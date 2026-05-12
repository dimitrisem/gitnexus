import InfoButtonStyle from '@/components/InfoButton/InfoButton.style';
import { IRestProps } from '@/typeDefs';
// @ts-ignore
import { Box, Button } from '@mui/material';
import { usePopover } from '@vendor/MuiMinimal/components/custom-popover';
import classNames from 'classnames';
import { memo, useCallback } from 'react';

// @ts-ignore
import { questionIcon } from '@constants/lordicon';

import CustomPopover from '@components/CustomPopover/CustomPopover';
import GlassFx from '@components/GlassFx/GlassFx';
import LordIcon from '@components/LordIcon/LordIcon';

import { useGlassFx } from '@hooks/useGlassFx';

interface IInfoButton {
	popoverTitle: string;
	popoverBody: string;
	popoverAnchorOrigin?: any;
  popoverTransformOrigin?: any;
	popoverLordIconSrc?: any;
	lordIconStyle?: React.CSSProperties;
	iconButtonProps?: object;
	lordIconTrigger?: 'loop' | 'loop-on-hover';
	withGlassFx?: boolean;
	disabled?: boolean;
}

type TInfoButton = IInfoButton & IRestProps;

const InfoButton = ( props: TInfoButton ) => {
  const popover = usePopover();

  const {
    popoverTitle,
    popoverBody,
    popoverAnchorOrigin = {
      vertical:   'top',
      horizontal: 'center',
    },
    popoverTransformOrigin = {
      vertical:   'bottom',
      horizontal: 'center',
    },
    popoverLordIconSrc = questionIcon,
    iconButtonProps,
    lordIconStyle = { width: '45px', height: '45px' },
    lordIconTrigger = 'loop-on-hover',
    withGlassFx = true,
    lordIconSrc = questionIcon,
    disabled,
    ...rest 
  } = props;
  const glassFx = withGlassFx ? useGlassFx() : null;
  const glassFxClass = withGlassFx ? glassFx?.glassFxChildClass : '';
  const ownClass = classNames( InfoButtonStyle().root, {
    disabled
  } );
	
  const onMouseEnter = useCallback( ( e ) => {
    popover.onOpen( e );
    withGlassFx && glassFx?.onGlassMouseEnter( e );
  }, [] );

  return (
    <Box { ...rest } className={ ownClass }>
      <CustomPopover
        title={ popoverTitle }
        body={ popoverBody }
        popover={ popover }
        anchorOrigin={ popoverAnchorOrigin }
        transformOrigin={ popoverTransformOrigin }
        lordIconSrc={ lordIconSrc }    
      />
			
      <Box
        className={ `${ glassFxClass }` }
        ref={ withGlassFx ? glassFx?.ref : null }
        onMouseEnter={ onMouseEnter }
        onMouseLeave={ popover.onClose }
        sx={ { borderRadius: '50%' } }
        { ...iconButtonProps }
			 >
        <Box>
          <LordIcon
            src={ popoverLordIconSrc }
            style={ lordIconStyle }
            trigger={ lordIconTrigger }
          />
        </Box>
        {/* @ts-ignore */}
        { withGlassFx && <GlassFx useGlassFx={ glassFx } /> }
      </Box>
    </Box>
  )
};

export default memo( InfoButton );
