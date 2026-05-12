import { githubGetUserFailed, githubGetUserSucceeded, gitHubSearchUserFailed, gitHubSearchUserSucceeded } from '@/store/github/actions';
import store from '@store/createStore';

import { BaseHelper, IReadApiHelper } from '@helpers/crudApiHelpers';

class GitHubApiHelper extends BaseHelper implements IReadApiHelper {
  searchAsync = async ( username: string ) => {
    this.requestName = 'searchUser';
    await this.fetchAndHandleResponse( `search/users?q=${username}` );
  };

  readAsync = async ( username: string ) => {
    this.requestName = 'getUser';
    await this.fetchAndHandleResponse( `users/${username}` );
  };

  onResponseSucceeded = (): void => {
    const responseHandlers = {
      searchUser: () => this.dispatchResponse( gitHubSearchUserSucceeded, gitHubSearchUserFailed ),
      getUser:    () => this.dispatchResponse( githubGetUserSucceeded, githubGetUserFailed ),
    };

    const handler = responseHandlers[ this.requestName ];
    if ( handler ) handler();
    this.requestName = '';
  };

  dispatchResponse = ( successAction: Function, failureAction ): void => {
    this.isSuccessResponse()
      ? store.dispatch( successAction( this.responseJson ) ) 
      : store.dispatch( failureAction( this.responseJson ) );
  }
}

export default GitHubApiHelper;
