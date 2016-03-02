import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

import '../style/style.less';

const history = createBrowserHistory();
const store = configureStore();

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app')
);
