import React from 'react';
import Lesson from './Lesson';
import ModalComponent from '../App/ModalComponent';
import { Link } from 'react-router';

class Steps extends React.Component {

  render() {
    let baseUrl = this.props.baseUrl;
	                                                                                                                                                                                                        const closeAll = this.props.close;

    return (
              <ol>
          			{this.props.steps.map(function (step, key) {
            key = key + 1;
            return <li key={key}><Lesson lesson={step} orderBy={key} closeAll={closeAll} baseUrl={baseUrl + '/' + key} /></li>;
          })}
              </ol>
            );
  }

}

class Sections extends React.Component {

  render() {
    let baseUrl = this.props.baseUrl;
	  const closeAll = this.props.close;

    return (<div id='lessons-modal' >

              <h1><Link to={this.props.baseUrl}>Course Home</Link></h1>

        			<h4>Choose a Lesson</h4>

              <ol>
          			{this.props.course.sections.map(function (section) {
            return <li key={section.id}><h2>{section.title}</h2><Steps steps={section.steps} closeAll={closeAll} baseUrl={baseUrl + '/' + section.id} /></li>;
          })}
              </ol>

        		</div>);
  }

}

export default class LessonsList extends React.Component {

  render() {
    return (<ModalComponent
      close={this.props.close}
      shouldDisplay={this.props.shouldDisplay}
      component={<Sections {...this.props} />}
    />);
  }

}
