/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Lesson from './LessonComponent';

import './CoursePrint.scss';

class SectionListed extends React.Component {

  render() {
    return (

        <ol><h3>{this.props.section.title}</h3>
        {this.props.section.steps.map(function (step,key) {
          return <li key={key} >{step.title}</li>;
        })}
        </ol>
    );
  }

}

class Section extends React.Component {

  render() {
    return (

        <div>
        {this.props.section.steps.map(function (step,key) {
          return <div key={key} > <Lesson lesson={step} /></div>;
        })}
        </div>
    );
  }

}

class SectionsOutline extends React.Component {

  render() {
    return (

        <ol>
        {this.props.sections.map(function (section,key) {
          return <li key={key} ><SectionListed section={section} /></li>;
        })}
        </ol>
    );
  }

}

class Sections extends React.Component {

  render() {
    return (

        <div>
        {this.props.sections.map(function (section,key) {
          return <div key={key} ><Section section={section} /></div>;
        })}
        </div>
    );
  }

}

class CoursePrintComponent extends React.Component {

  componentDidMount(){
    window.print(); 
  }

  render() {
    let baseUrl = '/course/';
    let course = JSON.parse(this.props.viewer.course.everything);

    return (

        <div id='print'>
                <h1><center>{course.title}</center></h1>

                <p>Notes written and edited by: {course.author}</p>

                <p>{course.description}</p>

                <h2>Table of Contents</h2>

                <SectionsOutline sections={course.sections}/>

                <Sections sections={course.sections}/>

        </div>
    );
  }

}

CoursePrintComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(CoursePrintComponent, {
  initialVariables: {
  	courseId: '1',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        course(id:$courseId){
          id
          everything
          }
      }`,
  },
});
