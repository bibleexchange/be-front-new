import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import './Course.scss';

class CourseThumbnail extends React.Component {

  render() {

    return (
    <li id="card">
      <Link to={"/course/"+this.props.course.id}>
      <img src={this.props.course.image} />
      <div className="divider"/>
      <h1>{this.props.course.title}</h1>
      </Link>
    </li>
    );
  }

}

CourseThumbnail.defaultProps = {};

export default Relay.createContainer(CourseThumbnail, {
  fragments: {
    course: () => Relay.QL`
      fragment on Course {
    				id
    				title
            lessonsCount
            image
		}`,
  },
});
