import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import CoursesWidget from './CoursesWidget';
import './CoursesIndex.scss';

class Index extends React.Component {

    componentWillMount(){
        if(this.props.params.filter !== undefined){
            this.props.handleUpdateCoursesFilter(this.props.params.filter)
        }

    }

  render() {
    return (
	      <div >

          <CoursesWidget
            courses={this.props.courses}
            handleUpdateCoursesFilter={this.props.handleUpdateCoursesFilter}
            handleNextPage={this.props.handleNextCoursesPage}
            coursesWidget={this.props.coursesWidget}
          />

	      </div>
    );
  }

}

Index.propTypes = {
    courses: React.PropTypes.object.isRequired,
    handleUpdateCoursesFilter: React.PropTypes.func.isRequired,
    handleNextCoursesPage: React.PropTypes.func.isRequired,
    coursesWidget: React.PropTypes.object.isRequired,
};
export default Relay.createContainer(Index, {
  fragments: {
	   courses: () => Relay.QL`
	  fragment on CourseConnection {
      ${CoursesWidget.getFragment('courses')}
		}`
  }
});
