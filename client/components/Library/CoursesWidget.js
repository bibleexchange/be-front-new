import React from 'react';
import Relay from 'react-relay';
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
      totalCount: 0
    }

    if(details.filter !== null){
      details.filter = details.filter.toLowerCase();
    }

    let noCourses = <h2>No courses match your search!</h2>;

    if (this.props.courses === undefined || this.props.courses === null) {

    }else{
        details.totalCount = this.props.courses.totalCount;

        if (this.props.courses.totalCount >= 1) {
            noCourses = null;
        }
    }

    return (
    		<div id='course-widget'>

          <SearchBox
            items={this.props.courses}
            details = {details}
            status={this.props.coursesWidget.status}
            handleClearFilter={this.props.handleClearCoursesFilter}
            handleUpdateFilter={this.props.handleUpdateCoursesFilter}
            handleNextPage={this.props.handleNextCoursesPage}
          />

          <ul id="cards">
            {this.props.courses.edges.map((c) => {
              return <CourseThumbnail key={c.node.id} course={c.node} />;
            })}
          </ul>
          <div style={{ display: 'inline-block', height: '175px', lineHeight: '175px' }}>{noCourses}</div>

    		</div>
    );
  }

 }

CoursesWidget.propTypes = {
  courses: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(CoursesWidget, {
  fragments: {
    courses: () => Relay.QL`
    fragment on CourseConnection {
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
            ${CourseThumbnail.getFragment('course')}
            id
          }
        }
    }`
  }
});
