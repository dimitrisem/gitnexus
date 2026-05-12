import { setUi } from '@store/ui';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EUi, IAppState } from '@typeDefs';

import CustomDialog from '@components/CustomDialog/CustomDialog';
import CustomDialogEventListeners from '@components/CustomDialog/CustomDialogEventListeners';
import CustomDialogTitle from '@components/CustomDialog/CustomDialogTitle';
import SearchContainer from '@components/Search/SearchContainer';
import SearchResults from '@components/Search/SearchResults';

const SearchDialog = () => {
  const dispatch = useDispatch();
  const isSearchDialogOpen = useSelector( ( { ui }: IAppState ) => ui.isSearchDialogOpen )
	
  const close = useCallback( () => {
    dispatch( setUi( EUi.isSearchDialogOpen, false ) );
  }, [] );

  return (
    <>
      { isSearchDialogOpen && <CustomDialogEventListeners closeOnEnter={ false } closeOnClick={ false } targetDialog={ EUi.isSearchDialogOpen } /> }
      <CustomDialog
        isOpen={ isSearchDialogOpen }
        setIsOpen={ close }
        closeButton={ false }
        dialogActionsProps={ {
          sx: { justifyContent: 'center' }
        } }
        title={
          <CustomDialogTitle
            isOpen={ isSearchDialogOpen }
            setIsOpen={ close }
            title='GitHub User Search'
            enterDelay={ .25 }
            closeOnClick={ false }
            closeOnEnter={ false }
          />
        }
        body={ <SearchResults /> }
        actions={ <SearchContainer /> }
      />
    </>
  );
};

export default SearchDialog;
