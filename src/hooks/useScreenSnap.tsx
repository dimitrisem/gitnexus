import Screen from '@/components/ScreenSnap/Screen';
import { planetsIcon } from '@/constants/lordicon';
import { IRestProps } from '@/typeDefs';

export type TScreenSnapView = 'primary' | 'progressing' | 'failed' | 'secondary';

export interface IUseScreenSnap {
  snap: React.FC<IOwnProps>;
}

interface IOwnProps {
  primaryTitle?: string;
  primarySubtitle?: string;
	lordIconSrc?: string;
}

export const useScreenSnap = (
  primaryTitle = 'Nothing In Here.',
  primarySubtitle = 'Let\'s Start',
  lordIconSrc = planetsIcon,
): IUseScreenSnap => {
  return {
    snap: ( props: IRestProps ) => (
      <Screen 
        primaryTitle={ primaryTitle } 
        primarySubtitle={ primarySubtitle }
        lordIconSrc={ lordIconSrc } 
        { ...props }
      />
    ),
  };
};
