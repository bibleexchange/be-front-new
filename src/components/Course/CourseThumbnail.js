import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

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

export default createFragmentContainer(CourseThumbnail, {
  course: graphql`
    fragment CourseThumbnail_course on Course {
                  id
                  title
          lessonsCount
          image
      }`,
});
