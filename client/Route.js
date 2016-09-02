import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';
import BibleQueries from './queries/BibleQueries';

//relay containers/components
import App from './components/App/AppContainer';
import Bible from './components/Bible/BibleContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries}>
    <IndexRoute component={Dashboard} queries={ViewerQueries} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
	<Route path='/bible/:ref' 
	  component={Bible} 
	  queries={BibleQueries} 
	  />
    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);