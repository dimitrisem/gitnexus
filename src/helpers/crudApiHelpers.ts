import ApiHelper from '@helpers/api.helper';

export abstract class BaseHelper extends ApiHelper {
	abstract dispatchResponse( successAction?, failureAction? );
}

export interface ICreateApiHelper {
  createAsync( entity: any ): Promise<void>;
}

export interface IReadApiHelper {
  readAsync( ...params ): Promise<void>;
}

export interface IUpdateApiHelper {
  updateAsync( ...params ): Promise<void>;
}

export interface IDeleteApiHelper {
  deleteAsync( entity: any ): Promise<void>;
}

