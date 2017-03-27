import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import CourseThumbnail from './CourseThumbnail';
import SearchBox from '../ListWidget/SearchBox'

import './CoursesWidget.scss';

class CoursesWidget extends React.Component {

  componentWillMount() {
    let filter = '';

    if (localStorage.getItem('courses-filter') !== null) {
      filter = localStorage.getItem('courses-filter');
      this.props.relay.setVariables({ filter: filter });
    }

	   this.state = {
      filter: filter,
      status:null
    	};

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: null
    });

    if (newProps.filter !== this.props.filter) {
      this.props.relay.setVariables({ filter: newProps.filter });

      localStorage.setItem('courses-filter', newProps.filter);

      this.setState({
        filter: newProps.filter
      });
    }
  }

  render() {

    let details = {
      title: {
        singular: "Course",
        plural: "Courses"
      },
      filter: null,
      totalCount: 0
    }

    if(this.state.filter !== null){
      details.filter = this.state.filter.toLowerCase();
    }

    let courses = [];
    let noCourses = <h2>No courses match your search!</h2>;

    if (this.props.viewer.courses !== undefined) {
      details.totalCount = this.props.viewer.courses.totalCount;
      courses = this.props.viewer.courses.edges;

      if (this.props.viewer.courses.totalCount >= 1) {
        noCourses = null;
      }
    }

    return (
    		<div id='course-widget'>

          <SearchBox
            items={this.props.viewer.courses}
            details = {details}
            status={this.state.status}
            handleClearFilter={this.handleClearFilter.bind(this)}
            runScriptOnPressEnter={this.runScriptOnPressEnter.bind(this)}
            handleEditFilter={this.handleEditFilter.bind(this)}
            applyFilter={this.handleEditFilter.bind(this)}
            handleNextPage={this.handleNextPage.bind(this)}
          />

          <ul id="cards">
            {courses.map((c) => {
              return <CourseThumbnail key={c.node.id} course={c.node} />;
            })}
          </ul>
          <div style={{ display: 'inline-block', height: '175px', lineHeight: '175px' }}>{noCourses}</div>

    		</div>
    );
  }

  handleEditFilter(event) {
    this.setState({ filter: event.target.value });
  }

  applyFilter(event) {
    this.props.relay.setVariables({
      filter: this.state.filter,
      cursor: null
    });
    this.setState({
      status: 'loading...'
    });
    localStorage.setItem('courses-filter', this.state.filter);
  }

  handleClearFilter(event) {
    event.preventDefault();
    this.setState({ filter: null });
    this.props.relay.setVariables({
      filter: null,
      cursor: null
    });

    localStorage.removeItem('courses-filter');

  }

  handleNextPage() {
    this.props.relay.setVariables({
      cursor: this.props.viewer.courses.pageInfo.endCursor
    });

  }

  runScriptOnPressEnter(e) {
    console.log('what key pressed?');
    if (e.keyCode == 13) {
      this.applyFilter(e);
    }
  }

}

CoursesWidget.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(CoursesWidget, {
  initialVariables: {
    cursor: null,
    pageSize: 6,
    filter: ''
  },
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {

      courses(filter:$filter, first:$pageSize, after:$cursor){
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
        }
    }`
  }
});
