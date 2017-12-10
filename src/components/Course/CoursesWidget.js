import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import CourseThumbnail from './CourseThumbnail';
import SearchBox from '../ListWidget/SearchBox'

import './CoursesWidget.scss';

class CoursesWidget extends React.Component {

  render() {

    let details = {
      title: {
        singular: "Course",
        plural: "Courses"
      },
      filter: this.props.coursesWidget.filter,
      totalCount: 0, noResultsMessage: "No courses match your search!"
    }

    if(details.filter !== null && details.filter !== undefined){
      details.filter = details.filter.toLowerCase();
    }

    if (this.props.courses === undefined || this.props.courses === null) {

    }else{
        details.totalCount = this.props.courses.totalCount;
    }

    return (
    		<div id='course-widget'>

          <SearchBox
            items={this.props.courses}
            details = {details}
            status={this.props.coursesWidget.status}
            handleClearFilter={this.props.handleClearCoursesFilter}
            handleUpdateFilter={this.props.handleUpdateCoursesFilter}
            handleNextPage={this.props.handleNextPage}
          />

          <ul id="cards">
            {this.props.courses.edges.map((c) => {
              return <CourseThumbnail key={c.node.id} course={c.node} />;
            })}
          </ul>

    		</div>
    );
  }

 }

CoursesWidget.propTypes = {
  courses: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default createFragmentContainer(CoursesWidget, {
  courses: graphql`
  fragment CoursesWidget_courses on CourseConnection {
      totalCount
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
       edges {
        cursor
        node{
          ...CourseThumbnail_course
          id
        }
      }
  }`
});
