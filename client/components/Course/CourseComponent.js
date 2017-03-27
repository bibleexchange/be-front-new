/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import Lesson from './LessonComponent';
import Navigation from './Navigation';

import './Course.scss';

class Found extends React.Component {

  componentWillMount() {
    let lang = "eng"

    if(localStorage.getItem('language') !== null){
      lang = localStorage.getItem('language')
    }

    this.state = {
      language: lang
    };
  }

  render() {
    let course = {};
    let sectionId = this.props.params.section ? this.props.params.section : 1;
    let stepId = this.props.params.step ? this.props.params.step : 1;
    let currentLesson = null;
    let baseUrl = '/course/' + this.props.viewer.course.id;
    let nextAndPrevious = {
      next: {
        step: false,
        section: false
      },
      previous: {
        step: false,
        section: false
      }
    };

    if (this.props.viewer.course !== undefined) {
      course = JSON.parse(this.props.viewer.course.everything);
      currentLesson = course.sections[sectionId - 1].steps[stepId - 1];
      nextAndPrevious = this.findNextAndPrevious(sectionId - 1, stepId - 1, course.sections);
    }

    return (
      	<div className='WidgetContainer'>
          <div className='Widget'>
             <Navigation course={course} section={sectionId} step={stepId} baseUrl={baseUrl} nextAndPrevious={nextAndPrevious} />
             <Lesson lesson={currentLesson} language={this.state.language} handleLanguage={this.handleLanguage.bind(this)} />
          </div>
      	</div>
    );
  }

  handleNoteLoad() {
    this.props.relay.setVariables({
      lessonPageSize: this.props.relay.variables.lessonPageSize + 1
    });
  }

  findNextAndPrevious(currentSection, currentStep, sections) {
    let nextStep = false;
    let nextSection = currentSection;

    if (sections[currentSection].steps[currentStep + 1] !== undefined) {
      nextStep = currentStep + 1;
      nextSection = currentSection;
    } else if (sections[currentSection + 1] === undefined) {
      nextStep = false;
      nextSection = false;
    } else if (sections[currentSection + 1].steps !== undefined) {
      nextStep = 0;
      nextSection = currentSection + 1;
    } else {
      nextSection = false;
    }

    let prevStep = false;
    let prevSection = currentSection;

    if (currentSection === 0 && currentStep === 0) {
      prevStep = false;
      prevSection = false;
    } else if (sections[currentSection].steps[currentStep - 1] !== undefined) {
      prevSection = currentSection;
      prevStep = currentStep - 1;
    } else if (sections[currentSection - 1].steps[sections[currentSection - 1].steps.length - 1] !== 'undefined') {
      prevStep = sections[currentSection - 1].steps.length - 1;
      prevSection = currentSection - 1;
    } else {
      prevStep = false;
      prevSection = false;
    }

    let previous = false;
    let next = false;

    if (prevStep !== false) {
      previous = {
        step: prevStep + 1,
        section: prevSection + 1
      };
    }

    return {
      next: {
        step: nextStep + 1,
        section: nextSection + 1
      },
      previous
    };
  }

  handleLanguage(lang){
    console.log(lang)
    localStorage.setItem('language',lang)
    this.setState({language: lang})
  }

}

class Missing extends React.Component {
  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                <h1>Sorry Cannot Find the Requested Course!</h1>
              </div>
       	</div>
    );
  }

}

class Course extends React.Component {

  render() {
    let renderThis = <Missing />;

    if (this.props.viewer.course !== null) {
      renderThis = <Found {...this.props} />;
    }

    return (renderThis);
  }

}

Course.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(Course, {
  initialVariables: {
  reference: 'amos_1',
  courseId: '1',
  lessonId: '1',
  pageSize: 1,
  opaqueCursor: 'opaqueCursor',
  courseSlug: '',
    token: 'tokentoekntoekn',
  },
  fragments: {
    viewer: ({ pageSize }) => Relay.QL`fragment on Viewer {

        user {
          authenticated
        }

        course(id:$courseId){
              id
              everything
              }
      }`,
  },
});
