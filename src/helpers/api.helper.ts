import store from '@store/createStore';
import { setUi } from '@store/ui';

import { TFetchRequestMethod, TApiHelperRequestName, EUi } from '@typeDefs';

abstract class ApiHelper {
  private apiUrl = 'https://api.github.com';
  protected requestName: TApiHelperRequestName;
  protected response: any= {} 
  protected responseStatus = 500;
  protected responseJson = {};

  public fetchAndHandleResponse = async (
    route: string, 
    method: TFetchRequestMethod = 'get', 
    data = {}, 
    rootRoute = this.apiUrl,
    parseJson = true,
  ) => {
    this.reset();
    await this.fetchData( route, method, data, rootRoute, parseJson );
    this.onResponseSucceeded();
  };

  private reset = () => {
    this.response = {};
    this.responseJson = {};
    this.responseStatus = 500;
  }

  private async fetchData( route: string, method: TFetchRequestMethod, data = {}, rootRoute, parseJson = true ) {
    try {
      const reqData: RequestInit = {
        method,
        headers: {
          'Content-Type':  'application/json',
          'Accept':        'application/json',
        },
      };

      if ( this.isPutOrPostMethod( method ) ) {
        reqData.body = JSON.stringify( data );
      }

      const resp = await fetch( `${rootRoute}/${route}`, reqData );
      this.responseStatus = resp.status;

      if ( parseJson ) {
        if ( resp.ok ) {
          this.responseJson = await resp.json();
          this.response = resp;
        } else {
          this.responseJson = {
            title:   'Uh-oh',
            msg:    `Looks like we hit a snag.`,
          };

          store.dispatch( setUi( EUi.error, this.responseJson ) );
        }
      }
    } catch ( e ) {
      this.responseJson = {
        title:  'Network Down',
        msg:    'Sending carrier pigeons instead.',
      };

      store.dispatch( setUi( EUi.error, this.responseJson ) );
    }
  }

  private isPutOrPostMethod = ( method: string ) => method === 'put' || method === 'post';
  protected isSuccessResponse = () => this.responseStatus === 200;
  protected extractResponseHeader = ( header: string ) => this?.response?.headers?.get( header );

  // Abstract method to be implemented by subclasses
  abstract onResponseSucceeded( ): void;
}

export default ApiHelper;
