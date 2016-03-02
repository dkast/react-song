import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Search from './components/Search';

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Search} />
  </Route>
);