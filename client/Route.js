import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

//queries
import ViewerQueries from './queries/ViewerQueries';
import DashboardQueries from './queries/DashboardQueries';

//relay containers/components
import App from './components/App/AppContainer';
import Bible from './components/Bible/BibleContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries}>
    <IndexRoute component={Dashboard} queries={DashboardQueries} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Redirect from='*' to='/' />
  </Route>
);