import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import BibleQueries from './queries/BibleQueries';
import CourseQueries from './queries/CourseQueries';
import ViewerQueries from './queries/ViewerQueries';
import EditorQueries from './queries/EditorQueries';

//relay containers/components
import App from './components/App/AppComponent';
import Bible from './components/Bible/BibleComponent';
import Course from './components/Course/CourseComponent';
import CourseEditor from './components/User/CourseEditor';
import Dashboard from './components/Dashboard/DashboardContainer';
import JWTCallback from './components/App/JWTCallback';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

const jwt = localStorage.getItem('jwt');

function prepareAppParams(params, { location }) {
 
  return {
    ...params
  };
};

function prepareCourseParams(params, { location }) {
  params.stepOrderBy = parseInt(params.stepOrderBy);
  params.courseId = parseInt(params.courseId);
  
  if(params.reference === undefined){params.reference = 'john_3_16';};
  if(params.slug === undefined){ params.slug = '';}
console.log(params);
  return {
    ...params
  };
};

export default (
  <Route path='/' component={App} queries={ViewerQueries} prepareParams={prepareAppParams}>
    <IndexRoute component={Dashboard} queries={ViewerQueries} prepareParams={prepareAppParams}/>
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/bible/:reference' component={Bible} queries={BibleQueries} />
    <Route path='/course/:courseId(:slug)/:stepOrderBy(/bible/:reference)' component={Course} queries={CourseQueries} prepareParams={prepareCourseParams}/>
    <Route path='/set-jwt' component={JWTCallback} />

<Route path='/user'>
	<Route path='course/:courseId/edit' component={CourseEditor} queries={EditorQueries}/>
</Route>

    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);
