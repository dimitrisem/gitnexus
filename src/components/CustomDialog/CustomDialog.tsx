import { IRestProps } from '@/typeDefs';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import classNames from 'classnames';
import { memo, useMemo } from 'react';

import CloseButton from './CloseButton';

export interface ICustomDialog {
	isOpen: boolean;
	body: React.ReactNode;
	title: string | JSX.Element;
	setIsOpen: ( isOpen: boolean ) => void;
	actions?: React.ReactNode;
	dialogActionsProps?: any;
	closeButton?: boolean;
}

type TCustomDialog = ICustomDialog & IRestProps;

const CustomDialog = ( props: TCustomDialog ) => {
  const {
    isOpen,
    title,
    body,
    actions = <></>,
    setIsOpen,
    closeButton = true,
    dialogActionsProps,
    ...rest
  } = props;
  const ownClass = useMemo( () => classNames( {
    'enter': isOpen,
    'exit':  !isOpen,
  } ), [ isOpen ] );

  return (
    <Dialog className={ ownClass } open={ isOpen } { ...rest }>
      <DialogTitle>
        { title }
      </DialogTitle>

      <DialogContent>
        { body }
      </DialogContent>

      { actions && (
        <DialogActions { ...dialogActionsProps }>
          { actions }

          { closeButton && <CloseButton setIsOpen={ setIsOpen } /> }
        </DialogActions>
      ) }
    </Dialog>
  );
};

export default memo( CustomDialog );
