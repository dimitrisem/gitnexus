import React from 'react';

declare module '*.mp3';
declare module '*.svg';

declare module '*' {
  const content: any
  export default content
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['lord-icon']: {
				trigger: string;
				src: string;
				style: React.CSSProperties
			}
    }
  }
}
