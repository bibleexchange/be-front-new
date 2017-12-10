import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
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
export default createFragmentContainer(Index, {
     courses: graphql`
    fragment CoursesIndex_courses on CourseConnection {
    ...CoursesWidget_courses
      }`
});
