import { useScreenSnap } from '@/hooks/useScreenSnap';
import { hasSelectedUserSel } from '@store/ui';
import { useSelector } from 'react-redux';

import { IAppState } from '@typeDefs';

import UserOverview from '@pages/OverviewPage/UserOverview';

import { useInitApp } from '@hooks/useInitApp';

const OverviewPage = () => {
  useInitApp();
  const hasSelectedUser = useSelector( ( state: IAppState ) => hasSelectedUserSel( state ) );
  const primaryScreen = useScreenSnap();
  return hasSelectedUser ? <UserOverview /> : <primaryScreen.snap />;
  return null;
};

export default OverviewPage;
