import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

// queries
import ViewerQueries from './queries/ViewerQueries';

// relay containers/components
import App from './components/App/AppComponent';
import AudioComponent from './components/Audio/AudioIndex';
import Bible from './components/Bible/BibleComponent';
import CoursesIndex from './components/Course/CoursesIndex';
import CourseLesson from './components/Course/CourseLesson';
import CourseIndex from './components/Course/CourseIndex';
import CoursePrint from './components/Course/CoursePrint';
import Dashboard from './components/Dashboard/Dashboard';
import NotesIndex from './components/Note/NotesIndex';
import NotePage from './components/Note/NotePageComponent';
import NotePrintPage from './components/Note/NotePrintPageComponent';

import Feed from './components/Dashboard/Feed'
import Menu from './components/Dashboard/Menu'
import MyCourses from './components/Dashboard/MyCourses'
import CourseEditor from './components/CourseEditor/CourseEditor'
import LessonEditor from './components/LessonEditor/LessonEditor'
import MyNotes from './components/Dashboard/MyNotes'
import MyBookmarks from './components/Dashboard/MyBookmarks'
import MyAccount from './components/Dashboard/MyAccount'
import LogOut from './components/Dashboard/LogOut'

export default (
  <Route path='/' component={App} queries={ViewerQueries} >
    <IndexRoute component={Bible} />

    <Route path='/courses(/tag/:filter)' component={CoursesIndex} />

    <Route path='course' >
      <Route path=':courseId' component={CourseIndex} />
      <Route path=':courseId/print' component={CoursePrint} />
      <Route path=':courseId/:lessonCursor' component={CourseLesson} />
    </Route>

    <Route path='/notes(/tag/:filter)' component={NotesIndex} />
    <Route path='/notes/:noteId' component={NotePage} />
    <Route path='/notes/:noteId/print' component={NotePrintPage} />

    <Route path='bible/:reference' component={Bible} />
    <Route path='audio(/:filterBy)' component={AudioComponent} />

    <Route path='/me' component={Dashboard}>
       <IndexRoute component={Menu} />
       <Route path='feed' component={Feed} />
       <Route path='courses' component={MyCourses} />
       <Route path='course/:userCourseId' component={CourseEditor} />
       <Route path='course/:userCourseId/:userLessonId' component={LessonEditor} />
       <Route path='notes' component={MyNotes} />
       <Route path='bookmarks' component={MyBookmarks} />
       <Route path='account' component={MyAccount} />
       <Route path='logout' component={LogOut} />
    </Route>

    <Redirect from='*' to='/bible/john_3_16' />
  </Route>
);    