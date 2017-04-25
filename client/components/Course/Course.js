/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import Lesson from './LessonComponent';
import Navigation from './Navigation';

import './Course.scss';

class Found extends React.Component {

  render() {
    let course = {}
    let sectionId = this.props.params.section ? this.props.params.section : 1;
    let stepId = this.props.params.step ? this.props.params.step : 1;
    let currentLesson = null;
    let baseUrl = '/course/' + this.props.course.id;
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

    if (this.props.course !== undefined) {
      course = JSON.parse(this.props.course.everything);
      currentLesson = course.sections[sectionId - 1].steps[stepId - 1];
      nextAndPrevious = this.findNextAndPrevious(sectionId - 1, stepId - 1, course.sections);
    }

    return (
      	<div className='WidgetContainer'>
          <div className='Widget'>
             <Navigation course={course} section={sectionId} step={stepId} baseUrl={baseUrl} nextAndPrevious={nextAndPrevious} />
             <Lesson lesson={currentLesson} language={this.props.language} handleLanguage={this.props.handleLanguage} />
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

    if (this.props.course !== null && this.props.course !== undefined) {
      renderThis = <Found {...this.props} />;
    }

    return (renderThis);
  }

}

Course.propTypes = {
  user: React.PropTypes.object.isRequired,
  course: React.PropTypes.object,  
};

export default Relay.createContainer(Course, {
  fragments: {
    user: () => Relay.QL`fragment on User {
          authenticated

      }`,
      course: () => Relay.QL`fragment on Course {
                  id
                  everything
          }`,
  },
});
