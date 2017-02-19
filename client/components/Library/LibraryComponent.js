import React from 'react'
import { Link } from "react-router"
import './Index.scss'

export default class LibraryComponent extends React.Component {

  render() {

    return (
    <div>
      <center><h2>{this.props.library.title} Courses</h2></center>
	{this.props.library.courses.edges.map(function(course){
		return <li key={course.node.title+course.node.id}><Link to={"/course/"+course.node.id}>{course.node.title}</Link></li>;
	})}

    </div>
    )
  }

}
