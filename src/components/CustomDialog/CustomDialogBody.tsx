import { memo } from 'react';

import { TAlertSeverity, TAnimationDelays } from '@typeDefs';

import { Animated } from '@components/Animated/Animated';
import CustomAlert from '@components/CustomAlert/CustomAlert';

interface ICustomDialogBody {
	severity: TAlertSeverity;
	animatedDelay?: TAnimationDelays;
	noAlert?: boolean;
	children?: React.ReactNode;
}

const CustomDialogBody = ( props: ICustomDialogBody ) => {
  const {
    severity,
    animatedDelay = '',
    noAlert = false,
    children
  } = props;

  return noAlert 
    ? children
    : (
      <Animated enterAnimation='slide-in-down' enterDuration={ animatedDelay }>
        {( { className } ) => (
          <CustomAlert className={ className } severity={ severity }>
            { children }
          </CustomAlert>
        ) }
      </Animated>
    )
};

export default memo( CustomDialogBody );
