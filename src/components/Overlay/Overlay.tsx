import { Paper } from '@mui/material';
import classNames from 'classnames'
import { useMemo } from 'react';

import { IChildren, IClassName, IRestProps } from '@typeDefs';

import OverlayStyle from './Overlay.style';

interface IOverlay {
	isHidden?: boolean;
	centerContent?: boolean;
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	width?: string;
	height?: string;
	margin?: string;
	padding?: string;
}

type TOverlay = IOverlay 
	& IRestProps
	& IClassName
	& IChildren;

const Overlay = ( props: TOverlay ) => {
  const {
    children,
    className = '',
    isHidden = false,
    centerContent = false,
    top = 'initial',
    bottom = 'initial',
    left = '0',
    right = 'initial',
    width = '100%',
    height = '100%',
    margin = 'initial',
    padding = 'initial',
    ...rest
  } = props;
  const ownClass = useMemo( () => classNames( className, {
    'is-hidden':      isHidden,
    'center-content': centerContent
  } ), [ isHidden, centerContent ] );
  const ownRootClass = OverlayStyle( { top, bottom, left, right, width, height, margin, padding } ).root;

  return (
    <Paper className={ `${ownRootClass } ${ownClass}` } { ...rest }>
      { children && children }
    </Paper>
  );
};

export default Overlay;
