// eslint-disable-next-line import/named
import { Alert, Grid, AlertProps as IAlertProps, Typography } from '@mui/material';
import { CSSProperties, memo, useCallback, useMemo } from 'react';

import { turquoiseBlue, redVermilion } from '@constants/css';
import { alertIcon, bulbIcon, checkInCircleIcon, errorIcon } from '@constants/lordicon';

import LordIcon from '@components/LordIcon/LordIcon';

interface ICustomAlert {
	centerContent?: boolean;
}

type TCustomAlert = ICustomAlert & IAlertProps;

const CustomAlert = ( props: TCustomAlert ) => {
  const { children, severity, centerContent = false, ...rest } = props;
  const { lordIconSeveritySrc, lordIconSeverityColors } = useMemo( () => {
    let src: any = bulbIcon;
    let colors = 'colors="primary:#121331,secondary:#3080e8"';

    if ( severity === 'error' ) {
      src = errorIcon;
      colors = `primary:${redVermilion},secondary:#fff`;
    } else if ( severity === 'warning' ) {
      src = alertIcon;
      colors = `primary:${turquoiseBlue},secondary:#fff`;
    } else if ( severity === 'success' ) {
      src = checkInCircleIcon
      colors = `primary:lime,secondary:#fff`;
    }

    return { lordIconSeveritySrc: src, lordIconSeverityColors: colors };
  }, [ severity ] );

  const getConditionalProps = useCallback( () => {
    let conditionalProps = {} as CSSProperties;

    if ( centerContent ) {
      conditionalProps[ 'justifyContent' ] = 'center';
      conditionalProps[ 'textAlign' ] = 'center';
    }

    return conditionalProps;
  }, [ centerContent ] )

  return (
    <Alert { ...rest } severity={ severity }>
      {/* @ts-ignore */}
      <Grid container alignItems='center' { ...getConditionalProps() }>
        <Grid item>
          <LordIcon
            trigger='loop'
            src={ lordIconSeveritySrc }
            colors={ lordIconSeverityColors }
            style={ { width: '60px', height: '60px', marginRight: '12px' } }
          />
        </Grid>
        <Grid item>
          <Typography variant='subtitle2'>
            { children }
          </Typography>
        </Grid>
      </Grid>
    </Alert>
  );
};

export default memo( CustomAlert );
