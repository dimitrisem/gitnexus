import { blurInInit, blurInAnim, bezierButterFramerM } from '@/constants/css';
import { useInitApp } from '@/hooks/useInitApp';
import { getUiSel, hasSelectedUserSel } from '@/store/ui';
import { CardContent, Card } from '@mui/material';
import { getRepos, getReposSel, setRepos } from '@store/repos';
import { m } from 'framer-motion';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '@typeDefs';

import ReposTable from '@pages/ReposPage/ReposTable/ReposTable';
import Pagination from '@components/Pagination/Pagination';

const ReposPage = () => {
  useInitApp();
  const repos = useSelector( ( { repos }: IAppState ) => repos.repos );
  const dispatch = useDispatch();
  const pagination = useSelector( ( state: IAppState ) => getReposSel( state ).pagination );
  const hasSelectedUser = useSelector( ( state: IAppState ) => hasSelectedUserSel( state ) );
  const selectedUser = useSelector( ( state: IAppState ) => getUiSel( state ).selectedUser );
  const memoizedHandleGetRepos = useCallback( () => dispatch( getRepos() ), [ pagination, selectedUser ] );
  const hasRepos = useMemo( () => repos.length > 0, [ repos ] );

  useEffect( () => {
    const shouldFetchRepos = !hasRepos && hasSelectedUser;
  	if( shouldFetchRepos ) memoizedHandleGetRepos();
  }, [ selectedUser ] );
		
  return (
    <m.div
      initial={ blurInInit }
      animate={ blurInAnim }
      transition={ { duration: .25, ease: bezierButterFramerM, } }
    >
      <Card>
        <CardContent>
          <ReposTable />
          <Pagination
            pagination={ pagination }
            dataCount={ pagination.total }
            dataGetterFunction={ getRepos }
          />
        </CardContent>
      </Card>
    </m.div>
  );
}

export default ReposPage;
