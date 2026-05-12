import { SpinnerProps as ISpinnerProps } from 'react-spinkit';

export interface ISpinkit {
	color?: Pick<ISpinnerProps, 'color'>;
}

export type TSpinkit = ISpinkit & ISpinnerProps;
