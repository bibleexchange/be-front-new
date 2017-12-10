import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';

import './LessonEditor.scss';


class Editor extends React.Component {

  componentWillMount(){

    this.state = {
      saved: true,
      userLesson: this.props.userLesson
    }
  }

  componentWillReceiveProps(newProps){

    let s = this.state
    s.saved = true
    s.userLesson = newProps.userLesson
    this.setState(s) 

  }

    render() { 
         
      let saveChangesButton = null

      if(!this.state.saved){
        saveChangesButton = <button onClick={this.saveChanges.bind(this)}>save changes</button>
      }

      let quiz = null
      if(this.props.userLesson.quizzes !== null){
        quiz = this.state.userLesson.quizzes.edges[0].node
      }
      

            return (<div id='lesson-editor'>

                      <ul id="lessons">
                          <button onClick={this.destroy.bind(this)}>delete lesson</button>
                          {saveChangesButton}
                          
                          <li><span>Title</span> <textarea value={this.state.userLesson.title} onChange={this.edit.bind(this)} data-id="title"></textarea></li>

                          
                          <li><span>Description</span> <textarea value={this.state.userLesson.description} data-id="description"  onChange={this.edit.bind(this)}></textarea></li>

                          <li><span>Body</span> <textarea value={this.state.userLesson.body.text} data-id="body" id="lesson-body" onChange={this.edit.bind(this)}></textarea></li>

                          <li><span>Questions</span> <textarea value={quiz.questions} data-id="questions" onChange={this.edit.bind(this)}></textarea></li>

                          <li><span>Solution</span> <textarea value={quiz.solution} data-id="solution" onChange={this.edit.bind(this)}></textarea></li>

                      </ul>
                </div>
            );
      }

    edit(e){
      let s = this.state
      s.saved = false

      switch(e.target.dataset.id){

          case "description":
          s.userLesson.description = e.target.value
          break;

          case "body":
          s.userLesson.body.text = e.target.value
          break;

          case "title":
          s.userLesson.title = e.target.value
          break;

          case "questions":
          s.userLesson.quizzes.edges[0].node.questions = e.target.value
          break;

          case "solution":
          s.userLesson.quizzes.edges[0].node.solution = e.target.value
          break;
      }
      
      this.setState(s)
    }

    saveChanges(e){
      let s = this.state
      this.props.handleMyLessonMutation(s.userLesson, "update")
      s.saved = true

      this.setState(s)
    }

     destroy(e){
      let s = this.state
      this.props.handleMyLessonMutation(s.userLesson, "destroy")
      s.saved = true
      this.setState(s)
    }

  }


class LessonEditor extends React.Component {

    render() { 

      let editor = <div/>
      if(this.props.userLesson !== null && this.props.userLesson !== undefined){
        editor = <Editor {...this.props} />
      }

      return (editor);
    }

  }

  LessonEditor.propTypes = {
      user: React.PropTypes.object.isRequired,
      userCourse: React.PropTypes.object,
      userLesson: React.PropTypes.object
  };

  export default createFragmentContainer(LessonEditor, {
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

      userLesson: ()=> Relay.QL`fragment on UserLesson {
              id
              title
              description
              order_by
              body {
                id
                text
              }
              created_at
              updated_at

               quizzes(first:1) {
                  edges {
                    node {
                      id
                      title
                      questions
                      solution
                    }
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
