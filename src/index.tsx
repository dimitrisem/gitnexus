import '@scss/index.scss';
import store from '@store/createStore'
import 'animate.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-virtualized/styles.css'

import App from '@components/App/App';

const AppWithProvider = () => (
  /* @ts-ignore */
  <Provider store={ store }>
    <App />
  </Provider>
);

const renderApp = () => {
  const root = document.getElementById( 'root' ) as HTMLElement;
  const rootElement = createRoot( root );
  rootElement.render( <AppWithProvider /> );
};

renderApp();

/* @ts-ignore */
if ( module.hot ) {
  /* @ts-ignore */
  module.hot.accept();
}
