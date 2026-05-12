import { lazy, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoadingScreen from '@components/LoadingScreen/LoadingScreen';

const OverviewPage = lazy( () => import( /* webpackChunkName: "OverviewPage" */ '@pages/OverviewPage/OverviewPage' ) );
const ReposPage = lazy( () => import( /* webpackChunkName: "ReposPage" */ '@pages/ReposPage/ReposPage' ) );

const AppRoutes = () => (
  <Routes>
    {/* Overview... */}
    <Route 
      path='/'
      element={
        <Suspense fallback={ <LoadingScreen title='Overview' /> }>
          {/* <Delay enterDelay={ pageRenderDelay }> */}
          <OverviewPage />
          {/* </Delay> */}
        </Suspense>
      }
    />

    {/* Repos... */}
    <Route 
      path='/repos'
      element={
        <Suspense fallback={ <LoadingScreen title='Repos' /> }>
          <ReposPage />
        </Suspense>
      }
    />
  </Routes>
);

export default memo( AppRoutes );
