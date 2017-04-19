import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

// queries
import ViewerQueries from './queries/ViewerQueries';

// relay containers/components
import App from './components/App/AppComponent';
import AudioComponent from './components/Audio/AudioIndex';
import Bible from './components/Bible/BibleComponent';
import CoursesIndex from './components/Course/CoursesIndex';
import Course from './components/Course/Course';
import CourseIndex from './components/Course/CourseIndex';
import CoursePrint from './components/Course/CoursePrint';
import Dashboard from './components/Dashboard/DashboardComponent';
import NotesIndex from './components/Note/NotesIndex';
import NotePage from './components/Note/NotePageComponent';
import NotePrintPage from './components/Note/NotePrintPageComponent';

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={Dashboard} />

    <Route path='/courses(/tag/:filter)' component={CoursesIndex} />

    <Route path='course' >
      <Route path=':courseId' component={CourseIndex} />
      <Route path=':courseId/print' component={CoursePrint} />
      <Route path=':courseId/:section/:step' component={Course} />
    </Route>

    <Route path='/notes(/tag/:filter)' component={NotesIndex} />
    <Route path='/notes/:noteId' component={NotePage} queries={ViewerQueries} />
    <Route path='/notes/:noteId/print' component={NotePrintPage} queries={ViewerQueries} />

    <Route path='bible/:reference' component={Bible} />
    <Route path='audio(/:filterBy)' component={AudioComponent} queries={ViewerQueries} />
    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);
