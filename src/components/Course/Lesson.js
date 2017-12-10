import React from 'react';
import { Link } from 'react-router';

export default class Lesson extends React.Component {
  render() {
  return (<Link to={this.props.baseUrl} onClick={this.props.closeAll}>Lesson #{this.props.orderBy} {this.props.lesson.title}</Link>);
  }
}
