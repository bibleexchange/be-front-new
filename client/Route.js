import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';

//relay containers/components
import App from './components/App/AppComponent';
import Bible from './components/Bible/BibleComponent';
import Course from './components/Course/CourseComponent';
import LibraryIndex from './components/Library/IndexComponent';
import CourseIndex from './components/Course/IndexComponent';
import CourseEditor from './components/User/CourseEditor';
import Dashboard from './components/Dashboard/DashboardComponent';
import JWTCallback from './components/App/JWTCallback';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={LibraryIndex} queries={ViewerQueries} />

    <Route path='course' >
      <Route path=':courseId' component={CourseIndex} queries={ViewerQueries} />
      <Route path=':courseId/note/:lessonnoteId' component={Course} queries={ViewerQueries} />
    </Route>

    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />

    <Route path='/set-jwt' component={JWTCallback} />
    <Route path='bible/:reference' component={Bible} queries={ViewerQueries}  />
    <Route path='/user' component={Dashboard} queries={ViewerQueries}>
      <Route path='course/:courseId/edit' component={CourseEditor} queries={ViewerQueries} />
    </Route>
    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);
