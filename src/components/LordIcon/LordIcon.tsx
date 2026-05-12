import { turquoiseBlue } from '@/constants/css';
import { getUiThemeSel } from '@/store/ui';
import React from 'react';
import { useSelector } from 'react-redux';

import { TSize, ICustomSize, IAppState } from '@typeDefs';

import { isDarkTheme } from '@utils';

interface ILordIcon {
  src: string;
	style?: React.CSSProperties;
	colors?: string;
  className?: string;
	size?: TSize;
	customSize?: ICustomSize;
  [key: string]: any;
};

const LordIcon: React.FC<ILordIcon> = ( {
  src,
  className = '',
  colors= `primary:${turquoiseBlue},secondary:#fff`,
  style = {},
  size = 'default',
  customSize = {},
  ...rest
} ) => {
  const isJsonIcon = src.includes( '.json' );
  const sizes = {
    default: { width: '40px', height: '40px' },
    sm:      { width: '32px', height: '32px' },
    md:      { width: '64px', height: '64px' },
    lg:      { width: '128px', height: '128px' },
    xl:      { width: '256px', height: '256px' },
    xxl:     { width: '512px', height: '512px' },
    custom:  { ...customSize },
  };
  const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const themedColors = isDarkTheme( uiTheme ) ? `primary:${turquoiseBlue},secondary:#fff` : ``

  return isJsonIcon 
    ? (
		  /* @ts-ignore */
      <lord-icon
        src={ src }
        className={ `lord-icon ${className}` }
        colors={ themedColors }
        /* @ts-ignore */
        width={ sizes[ size ].width }
        /* @ts-ignore */
        height={ sizes[ size ].height }
        /* @ts-ignore */
        style={ { width: sizes[ size ].width, height: sizes[ size ].height } }
        { ...rest }
      />
    ) 
    : (
      <img 
        src={ src }
        /* @t-ignore */
        width={ sizes[ size ].width }
        /* @t-ignore */
        height={ sizes[ size ].height }
        className={ `lord-icon ${className}` }
        style={ {
          ...style,
          minWidth:  style?.width,
          minHeight: style?.height,
        } }
        { ...rest }
      />
    )
};

export default LordIcon;
