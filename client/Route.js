import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

//queries
import CourseQueries from './queries/CourseQueries';
import DashboardQueries from './queries/DashboardQueries';
import ViewerQueries from './queries/ViewerQueries';

//relay containers/components
import App from './components/App/AppContainer';
import Bible from './components/Bible/BibleContainer';
import Course from './components/Course/CourseContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries}>
    <IndexRoute component={Dashboard} queries={DashboardQueries} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
	<Route path='/course'>
		<Route path='{:courseId}_{:courseTitle}' component={Course} queries={CourseQueries}/>
		<Redirect from='*' to='/course/1_kjv-bible' />
	</Route>
    <Redirect from='*' to='/' />
  </Route>
);