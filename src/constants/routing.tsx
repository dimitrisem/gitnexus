import { circleAvatarIcon, repoIcon } from '@/constants/lordicon';

import { INavItem } from '@typeDefs';

import LordIcon from '@components/LordIcon/LordIcon';

export const overviewRoute: INavItem = {
  title:   'Overview',
  path:    '/',
  icon:    <LordIcon size='md' trigger='loop-on-hover' src={ circleAvatarIcon } />,
};

export const reposRoute: INavItem = {
  title: 'Repos',
  path:  '/repos',
  icon:  <LordIcon size='md' trigger='loop-on-hover' src={ repoIcon } />,
};

export const routes = [
  overviewRoute,
  reposRoute
];
