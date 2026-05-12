import store from '@store/createStore';
import { getReposFailed, getReposSucceeded, setRepos } from '@store/repos';
import { ERepos } from '@store/repos/typeDefs';
import { getUiSel } from '@store/ui';

import { IAppState } from '@typeDefs';

import { extractPaginationFromHeader } from '@utils';

import { BaseHelper, IReadApiHelper } from '@helpers/crudApiHelpers';

class ReposApiHelper extends BaseHelper implements IReadApiHelper {
  readAsync = async ( perPage: number, page: number ) => {
    this.requestName = 'getRepos';
    const appState = store.getState() as IAppState;
    const selectedUser = getUiSel( appState ).selectedUser;
    await this.fetchAndHandleResponse( `users/${selectedUser.login}/repos?per_page=${perPage}&page=${page}` );
  };

  onResponseSucceeded = (): void => {
    const responseHandlers = {
      getRepos: () => this.dispatchResponse( getReposSucceeded, getReposFailed ),
    };

    const handler = responseHandlers[ this.requestName ];
    if ( handler ) handler();
  };

  dispatchResponse = ( successAction: Function, failureAction: Function ): void => {
    const linkHeader = this.extractResponseHeader( 'Link' );
    if ( this.isSuccessResponse() ) {
      if ( linkHeader ) {
        const newPagination = extractPaginationFromHeader( linkHeader );
        store.dispatch( setRepos( ERepos.pagination, newPagination ) );
      }

      store.dispatch( successAction( this.responseJson ) ) 
    } else {
      store.dispatch( failureAction( this.responseJson ) );
    }
  }
}

export default ReposApiHelper;
