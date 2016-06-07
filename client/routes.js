import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

//queries
import ViewerQueries from './queries/ViewerQueries';
//import LibraryQueries from './queries/LibraryQueries';

//relay containers/components
import App from './components/App/AppContainer';
import Bible from './components/Bible/BibleContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

/* eslint-disable react/jsx-no-bind */
export default (
  <Route
    path="/" component={App}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={Dashboard}
      queries={ViewerQueries}
      prepareParams={() => ({ status: 'any' })}
    />
    <Route
      path=":status" component={Dashboard}
      queries={ViewerQueries}
    />
  </Route>
);