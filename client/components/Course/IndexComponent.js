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

  componentWillMount() {
    // let filterBy = localStorage.getItem('notes-filter')
    // localStorage.setItem('notes-filter',filterBy)

    this.state = {
      lesson: 1
    };
  }

  render() {
    let baseUrl = '/course/';
    let course = { title: 'Course Could not Be Loaded!' };
    let sections = [];
    let edit = null;
    let data = { sections: [], title: '' };

    if (this.props.viewer.course !== null) {
      course = this.props.viewer.course;
      let data1 = JSON.parse(course.everything);
      baseUrl = '/course/' + course.id;
      if (data1 !== null) {
        sections = data.sections;
        data = data1;
      }
    }

    if (this.props.viewer.user.authenticated == 'true') {
     // edit = <sup><Link to={"/user/course/"+course.id+"/edit"}> edit</Link></sup>;
    }
if(data.image === ""){
  data.image = this.props.viewer.course.image
}

    return (
        <div className='WidgetContainer'>
              <div className='Widget'>
                <center><h1>{data.title} {edit}</h1></center>

                <ul id='buttons-nav'>
                  <li><Link to={'/course/' + course.id + '/print'} target="_blank">PRINT COURSE</Link></li>
                </ul>

                <img src={data.image} id='course-cover' />
                <SectionsList sections={data.sections} baseUrl={baseUrl} />
              </div>
        </div>
    );
  }

}

IndexComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(IndexComponent, {
  initialVariables: {
  	                                                                                                    courseId: '1',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user{
          authenticated
        }
        course(id:$courseId){
              id
              image
              everything
              }
      }`,
  },
});
