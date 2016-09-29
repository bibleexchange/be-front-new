import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';
import CourseQueries from './queries/CourseQueries';

//relay containers/components
import App from './components/App/AppComponent';
import Bible from './components/Bible/BibleComponent';
import Course from './components/Course/CourseComponent';
import LibraryIndex from './components/Library/IndexComponent';
import CourseIndex from './components/Course/IndexComponent';
import CoursePrint from './components/Course/CoursePrintComponent';
import NotesIndex from './components/Note/NotesIndex';
import NotePage from './components/Note/NotePageComponent';
import CourseEditor from './components/User/CourseEditor';
import Dashboard from './components/Dashboard/DashboardComponent';
import JWTCallback from './components/App/JWTCallback';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

console.log('Route.js loaded.');

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={LibraryIndex} queries={ViewerQueries} />

    <Route path='course' >
      <Route path=':courseId' component={CourseIndex} queries={ViewerQueries} />
      <Route path=':courseId/print' component={CoursePrint} queries={ViewerQueries} />
      <Route path=':courseId/lesson/:lessonId' component={Course} queries={CourseQueries} />
    </Route>

    <Route path='/notes' component={NotesIndex} queries={ViewerQueries} />
    <Route path='/notes/:noteId' component={NotePage} queries={ViewerQueries} />

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
