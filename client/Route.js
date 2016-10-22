import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Relay from 'react-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';

//relay containers/components
import App from './components/App/AppComponent';
import Bible from './components/Bible/BibleComponent';
import Course from './components/Course/CourseComponent';
import Dashboard from './components/Dashboard/DashboardComponent';
import LibraryIndex from './components/Library/IndexComponent';
import CourseIndex from './components/Course/IndexComponent';
import CoursePrint from './components/Course/CoursePrintComponent';
import NotesIndex from './components/Note/NotesIndex';
import NotePage from './components/Note/NotePageComponent';
import NotePrintPage from './components/Note/NotePrintPageComponent';
import NoteEditorPage from './components/Note/NoteEditorComponent';
import CourseEditor from './components/User/CourseEditor';
import LessonEditor from './components/User/LessonEditor';

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={Dashboard} queries={ViewerQueries} />

    <Route path='/courses' component={LibraryIndex} queries={ViewerQueries} />

    <Route path='course' >
      <Route path=':courseId' component={CourseIndex} queries={ViewerQueries} />
      <Route path=':courseId/print' component={CoursePrint} queries={ViewerQueries} />
      <Route path=':courseId/lesson/:lessonId' component={Course} queries={ViewerQueries} />
    </Route>

    <Route path='/notes(/tag/:filterBy)' component={NotesIndex} queries={ViewerQueries} />
    <Route path='/notes/:noteId' component={NotePage} queries={ViewerQueries} />
    <Route path='/notes/:noteId/print' component={NotePrintPage} queries={ViewerQueries} />
    <Route path='/notes/:noteId/edit' component={NoteEditorPage} queries={ViewerQueries} />

    <Route path='bible/:reference' component={Bible} queries={ViewerQueries}  />
    <Route path='/user' component={Dashboard} queries={ViewerQueries} />
    <Route path='/user/course/:courseId/edit' component={CourseEditor} queries={ViewerQueries} >
      <Route path=':lessonId' component={LessonEditor} queries={ViewerQueries} />
    </Route>
    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);
