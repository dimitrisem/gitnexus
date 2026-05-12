import { Paper, Typography, LinearProgress } from '@mui/material';
import { getUiThemeSel, setUi } from '@store/ui';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ELayoutLevel, EUi, IAppState } from '@typeDefs';

import { Animated } from '@components/Animated/Animated';

import LoadingScreenStyle from './LoadingScreen.style';

interface ILoadingScreen {
  title: string;
	zIndex?: ELayoutLevel;
	animate?: boolean;
}

const LoadingScreen = ( props: ILoadingScreen ) => {
  const { title, zIndex = ELayoutLevel.veryHigh, animate = true } = props;
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const loadingScreenClass = LoadingScreenStyle( { uiTheme } ).root;
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( setUi( EUi.isLoadingScreenVisible, true ) );

    return () => {
      dispatch( setUi( EUi.isLoadingScreenVisible, false ) );
    }
  }, [] );

  return (
    <Animated enterAnimation={ animate ? 'slide-in-up' : '' }>
      {( { className } ) => (
        <Paper
          className={ `${loadingScreenClass} ${className}` }
          elevation={ 3 }
        >
          <div id='container'>
            <Typography variant='h1' component='h1'>
              GitNexus
            </Typography>

            <LinearProgress
              id='progress'
              color='inherit'
              variant='query'
              sx={ { mb: 2, width: '300px' } }
            />

            <Typography variant='h3' component='h3'>
              { title }
            </Typography>
          </div>

          <div id='footer'>
            <Typography id='footer-text' variant='h5' component='h5'>
              Passionately crafted with 💘
            </Typography>
          </div>
        </Paper>
      ) }
    </Animated>
  );
};

export default memo( LoadingScreen );
