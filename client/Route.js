import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';

//relay containers/components
import App from './components/App/AppComponent';
import Bible from './components/Bible/BibleComponent';
import Course from './components/Course/CourseComponent';
import CourseEditor from './components/User/CourseEditor';
import Dashboard from './components/Dashboard/DashboardContainer';
import JWTCallback from './components/App/JWTCallback';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={Dashboard} queries={ViewerQueries} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/course/:courseId(:slug)/:stepOrderBy(/bible/:reference)' component={Course} queries={ViewerQueries} />
    <Route path='/set-jwt' component={JWTCallback} />
    <Route path='bible/:reference' component={Bible} queries={ViewerQueries}  />
    <Route path='/user'>
      <Route path='course/:courseId/edit' component={CourseEditor} queries={ViewerQueries} />
    </Route>
    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);
