import LordIcon from '@/components/LordIcon/LordIcon';
import { quotationMarkIcon } from '@/constants/lordicon';
import { Card, CardContent, Grid } from '@mui/material';
import { getUiSel, setUi } from '@store/ui';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EUi, IAppState } from '@typeDefs';

import CustomDialog from '@components/CustomDialog/CustomDialog';
import CustomDialogEventListeners from '@components/CustomDialog/CustomDialogEventListeners';
import CustomDialogTitle from '@components/CustomDialog/CustomDialogTitle';

const DescriptionDisplayDialog = () => {
  const dispatch = useDispatch();
  const isDescriptionDisplayOpen = useSelector( ( state: IAppState ) => getUiSel( state ).isDescriptionDisplayOpen );
  const selectedRepoDescription = useSelector( ( state: IAppState ) => getUiSel( state ).selectedRepoDescription );
  const close = useCallback( () => {
    dispatch( setUi( EUi.selectedRepoDescription, false ) );
  }, [] );

  return (
    <>
      { isDescriptionDisplayOpen && <CustomDialogEventListeners targetDialog={ EUi.isDescriptionDisplayOpen } /> }
      <CustomDialog
        isOpen={ isDescriptionDisplayOpen }
        setIsOpen={ close }
        closeButton={ false }
        dialogActionsProps={ {
          sx: { justifyContent: 'center' }
        } }
        title={
          <CustomDialogTitle
            isOpen={ isDescriptionDisplayOpen }
            setIsOpen={ close }
            title='GitHub User Search'
            enterDelay={ .25 }
          />
        }
        body={
          <Grid alignItems='center'>
            <Grid item sx={ { mr: 2 } }>
              <LordIcon src={ quotationMarkIcon } />
            </Grid>

            <Grid item>
              <Card>
                <CardContent>
                  {selectedRepoDescription}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default DescriptionDisplayDialog;
