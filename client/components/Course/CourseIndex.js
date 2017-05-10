/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class Step extends React.Component {

  render() {
    const baseUrl = this.props.baseUrl;

    return (
          <h5><Link to={baseUrl + '/' + this.props.id}>LESSON {this.props.id} {this.props.step.title}</Link></h5>
    );
  }

}

class StepsList extends React.Component {

  render() {
    let baseUrl = this.props.baseUrl;

    return (
              <div>
                {this.props.steps.map(function (step, key) {
                  key = key + 1;
                  return <Step key={key} baseUrl={baseUrl} id={key} step={step} />;
                })}
              </div>
    );
  }

}

class Section extends React.Component {

  render() {
    return (
              <div>
                {this.props.section.title}
                <StepsList steps={this.props.section.steps} baseUrl={this.props.baseUrl + '/' + this.props.section.id} />
              </div>
    );
  }

}

class SectionsList extends React.Component {

  render() {
    let baseUrl = this.props.baseUrl;

    return (
              <div>
                {this.props.sections.map(function (section, key) {
                  return <h2 key={key} ><Section section={section} baseUrl={baseUrl} /></h2>;
                })}
              </div>
    );
  }

}

class IndexComponent extends React.Component {

viewer
    render() {
    let baseUrl = '/course/';
    let sections = [];
    let edit = null;
    let data = { sections: [], title: '' };

    if (this.props.course !== null && this.props.course !== undefined) {
      let data1 = JSON.parse(this.props.course.everything);
      baseUrl = '/course/' + this.props.course.id;
      if (data1 !== null) {
        sections = data.sections;
        data = data1;
      }
    }

    if (this.props.user.authenticated == 'true') {
     // edit = <sup><Link to={"/user/course/"+course.id+"/edit"}> edit</Link></sup>;
    }
if(data.image === ""){
  data.image = this.props.course.image
}
console.log('course index', this.props.course)
    return (
        <div className='WidgetContainer'>
              <div className='Widget'>
                <h1>{data.title} {edit}</h1>

                <ul id='buttons-nav'>
                  <li><Link to={'/course/' + this.props.course.id + '/print'} target="_blank">PRINT COURSE</Link></li>
                </ul>

                <img src={data.image} id='course-cover' />
                <SectionsList sections={data.sections} baseUrl={baseUrl} />
              </div>
        </div>
    );
  }

}

IndexComponent.propTypes = {
  course: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(IndexComponent, {
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
