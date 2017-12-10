/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import Lesson from './LessonComponent';

import './CoursePrint.scss';

class SectionListed extends React.Component {

  render() {
      console.log(this.props.section)
    return (

        <ol><h3>{this.props.section.title}</h3>
        {this.props.section.steps.map(function (step,key) {
            let title = step.title
            if(step.title === null){
                title = <span>Lesson # {key+1}</span>
            }

          return <li key={key} >{title}</li>;
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

class PrintComponent extends React.Component {

    componentDidMount(){
        window.print();
    }

    render() {
        let baseUrl = '/course/';
        let course = JSON.parse(this.props.course.everything);

        return (

            <div id='print'>
                <h1><center>{course.title}</center></h1>

                <p>Notes written and edited by: {course.author}</p>

                <p>{course.description}</p>

                <h2>Table of Contents</h2>

                <SectionsOutline sections={course.sections}/>
                <h1>&nbsp;</h1>
                <Sections sections={course.sections}/>

            </div>
        );
    }

}

class CoursePrintComponent extends React.Component {

  render() {
      let component = null

      if(this.props.course !== undefined && this.props.course !== null){
          component = <PrintComponent {...this.props} />
      }else{
          component = null
      }

    return (

        <div>{component}</div>
    );
  }

}

CoursePrintComponent.propTypes = {
  course: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(CoursePrintComponent, {
  course: () => Relay.QL`fragment on Course {
              id
              everything
      }`,
});
