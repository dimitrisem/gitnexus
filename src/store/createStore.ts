import * as githubEpic from '@store/github';
import * as reposEpic from '@store/repos';
import { repos } from '@store/repos';
import { ui } from '@store/ui';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

const rootEpic: ReturnType<typeof combineEpics> = combineEpics(
  githubEpic.searchGitHubUserEpic,
  githubEpic.searchGitHubUserSucceededEpic,
  githubEpic.searchGitHubUserSucceededOrFailedEpic,
  githubEpic.searchGitHubUserFailedEpic,
  githubEpic.getGitHubUserEpic,
  githubEpic.getGitHubUserSucceededEpic,
  githubEpic.getGitHubUserSucceededOrFailedEpic,
  reposEpic.getReposEpic,
  reposEpic.getReposSucceededEpic,
  reposEpic.getReposSucceededOrFailedEpic,
);

const rootReducer = combineReducers( {
  ui,
  repos,
} );

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = composeWithDevTools( {
  trace: true,
} );

const store: ReturnType<typeof createStore> = createStore(
  rootReducer,
  composeEnhancers( applyMiddleware( epicMiddleware ) )
);

epicMiddleware.run( rootEpic );
export default store;
