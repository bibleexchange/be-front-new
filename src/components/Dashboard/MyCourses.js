import React from 'react'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat'
import { Link } from 'react-router'

class MyCourses extends React.Component {

componentWillMount(){
  this.state = {
    course: {
      title:"",
      description:"",
      verse: {
        reference:"Genesis 1:1"
      }
    }
  }
}

render() {
      let courses = this.props.userCourses.edges
      let nextButton = null

      if(this.props.userCourses.pageInfo.hasNextPage){
       nextButton = <button onClick={this.props.handleMoreMyCourses}>more</button>
      }

    return (
    <div id="dashoard-menu" style={{backgroundColor:"white"}}>

          Create Course: <input type="text" name="create-course" 
          onChange={this.updateNewCourse.bind(this)} 
          value={this.state.course.title}/>  

          <input type="submit" onClick={this.createNewCourse.bind(this)} />
          <hr />

        <h1>Search My Courses ({this.props.userCourses.totalCount}): 
        <input type="text" name="search-menu" 
          onChange={this.props.handleUpdateMyCoursesFilter} 
          value={this.props.coursesWidget.filter}/>     
</h1>

        
        <ul id="menu">

        {courses.map(function(n){
          return <li key={n.node.id}><Link to={"/me/course/"+ n.node.id}>{n.node.title}</Link></li>
        })}

        </ul>

          {nextButton}

        </div>)
  }

  updateNewCourse(e){
    let n = this.state
    n.course.title = e.target.value

    this.setState(n)
  }

  createNewCourse(e){
    this.props.handleMyCourseMutation(this.state.course, "create")
    this.setState({course:{title:"",description:"", reference:""}})
  }

}

MyCourses.propTypes = {
  user: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

MyCourses.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default createFragmentContainer(MyCourses, {
    user: graphql`
    fragment MyCourses_user on User {
      authenticated
      name
      email
    }
  `,

  userCourses: graphql`
   fragment MyCourses_userCourses on UserCourseConnection {
            totalCount

            pageInfo{
              hasNextPage
            }
            edges{
                node {
                    id
                    title
                    verse {id, reference}
                    owner {name}
                }
            }
      }`

});
