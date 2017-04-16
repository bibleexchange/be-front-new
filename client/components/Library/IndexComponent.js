import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import CoursesWidget from './CoursesWidget';
import './Index.scss';

class Index extends React.Component {

  render() {
    return (
	      <div className='WidgetContainer' >
          <div className='Widget'>

          <CoursesWidget
            courses={this.props.courses}
            handleUpdateCoursesFilter={this.props.handleUpdateCoursesFilter}
            handleNextPage={this.props.handleNextCoursesPage}
            coursesWidget={this.props.coursesWidget}
            handleClearCoursesFilter={this.props.handleClearCoursesFilter}
          />

          </div>
	      </div>
    );
  }

}

Index.propTypes = {
    courses: React.PropTypes.object.isRequired,
    handleUpdateCoursesFilter: React.PropTypes.func.isRequired,
    handleNextCoursesPage: React.PropTypes.func.isRequired,
    coursesWidget: React.PropTypes.object.isRequired,
    handleClearCoursesFilter: React.PropTypes.func.isRequired,
};
export default Relay.createContainer(Index, {
  fragments: {
	   courses: () => Relay.QL`
	  fragment on CourseConnection {
      ${CoursesWidget.getFragment('courses')}
		}`
  }
});
