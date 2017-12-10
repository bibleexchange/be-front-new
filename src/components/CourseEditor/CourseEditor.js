import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';

import './CourseEditor.scss';


class Editor extends React.Component {

  componentWillMount(){

    this.state = {
      saved: true,
      course: this.props.userCourse
    }
  }

  componentWillReceiveProps(newProps){

    let s = this.state
    s.saved = true
    s.course = newProps.userCourse
    this.setState(s) 

  }

    render() { 
         
      let saveChangesButton = null

      if(!this.state.saved){
        saveChangesButton = <button onClick={this.saveChanges.bind(this)}>save changes</button>
      }

      let course = this.state.course

            return (<div id='course-editor'>

                      <ul id="lessons">
                          <button onClick={this.destroy.bind(this)}>delete course</button>
                          {saveChangesButton}
                          <li><span>Title</span> <textarea value={course.title} onChange={this.edit.bind(this)} data-id="title"></textarea></li>

                          <li><span>Scripture Reference</span> 
                          <textarea value={
                            course.verse.reference} onChange={this.edit.bind(this)} data-id="verse_reference"></textarea>
                            </li>

                          <li><span>Description</span> <textarea value={this.state.course.description} data-id="description"  onChange={this.edit.bind(this)}></textarea></li>

                          <li><span>Public?</span> <textarea value={course.public} data-id="public"  onChange={this.edit.bind(this)}></textarea></li>

                          {this.state.course.lessons.edges.map(function(l,i){
                            return <li key={i}><Link to={"/me/course/"+course.id+"/"+l.node.id}><span>Lesson #{l.node.order_by}</span> (last updated: {l.node.updated_at}){l.node.title} ({l.node.order_by})</Link></li>;
                          })}

                          <li><span>Add New Lesson</span> <button onClick={this.addLesson.bind(this)}>create</button></li>

                      </ul>
                </div>
            );
      }

    addLesson(){
      this.props.handleMyCourseMutation(this.state.course, "create_lesson")
    }

    edit(e){
      let s = this.state
      s.saved = false

      switch(e.target.dataset.id){
        case "verse_reference":
          s.course.verse.reference = e.target.value 
          break;

          case "description":
          s.course.description = e.target.value
          break;

          case "public":
          s.course.public = e.target.value
          break;


          case "title":
          s.course.title = e.target.value
          break;
      }
      
      this.setState(s)
    }

    saveChanges(e){
      let s = this.state
      this.props.handleMyCourseMutation(s.course, "update")
      s.saved = true

      this.setState(s)
    }

     destroy(e){
      let s = this.state
      this.props.handleMyCourseMutation(s.course, "destroy")
      s.saved = true
      this.setState(s)
    }

  }


class CourseEditor extends React.Component {

    render() { 

      let editor = <div/>

      if(this.props.userCourse !== null && this.props.userCourse !== undefined){
        editor = <Editor {...this.props} />
      }

      return (editor);
    }

  }

  CourseEditor.propTypes = {
      user: React.PropTypes.object.isRequired,
      userCourse: React.PropTypes.object
  };

  export default createFragmentContainer(CourseEditor, {
      userCourse: ()=> Relay.QL`fragment on UserCourse {

              id
              title
              description
              verse{
                id
                reference
              }
              public
 
              lessons (first:100){
                edges {
                  node {
                    id
                    title
                    order_by
                    description
                    body {
                      id
                      text
                    }
                    created_at
                    updated_at

                  }
                }
              }

      }`,

    userCourses: ()=> Relay.QL`fragment on UserCourseConnection {        
      edges{
        node{
          id
        }
      }
    }`,
      user: () => Relay.QL`fragment on User {
          id
          name
          email
          authenticated
      }`
  });
