
export interface ILoadingScreen {
	title: string;
	lordIconSrc: string;
	opacity: number;
	blur: number;
}

export type TLoadingScreenStyle = Pick<ILoadingScreen, 'opacity' | 'blur'>;
