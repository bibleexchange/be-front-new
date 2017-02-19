import React from 'react'
import { Link } from 'react-router'
import Relay from 'react-relay'
import CourseUpdateMutation from './CourseUpdateMutation'
import auth from '../App/auth'

import MenuBar from './MenuBar'
import SideBar from './SideBar'
import MainContent from './MainContent'
import Status from './StatusComponent'

import './CourseEditor.scss'

class CourseEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
     loggedIn: auth.loggedIn(),
     online: navigator.onLine,
     course:this.props.viewer.courses.edges[0].node,
     status: <Status type="done"/>,
     sideBarState: true,
     noteDrawerState: false
    }
}

  componentWillMount(){
    if(!this.state.loggedIn){this.context.router.push('/')}
  }

componentWillReceiveProps(newProps){
  this.setState({
    status: <Status type="done"/>,
  })

  if(newProps !== this.props){
    this.props = newProps
  }

}

  render() {

    let newLessonForm={display:"none"}
    if(this.state.newLessonState){newLessonForm.display = "block"}
    let selectedNote = null
    let parentUrl = "/course/"+this.state.course.id+"/edit"
    if(this.props.viewer.notes.edges[0] !== undefined){selectedNote = this.props.viewer.notes.edges[0].node}

    return (
          <div id="course-editor">
            <MenuBar
              course={this.state.course}
              courseInfo={this.props.viewer.courses.edges[0].node}
              editTitle={this.handleEditTitle.bind(this)}
              updateTitle={this.handleUpdateTitle.bind(this)}
              status={this.state.status}
	            toggleNewLesson={this.toggleSideBar.bind(this)}
              toggleNoteDrawer={this.toggleNoteDrawer.bind(this)}
              sideBarState={this.state.sideBarState}
              noteDrawerState={this.state.noteDrawerState}
              />

            <SideBar course={this.state.course}
              style={newLessonForm}
              status={this.state.sideBarState}
              notesStatus={this.state.noteDrawerState}
              selectNote={this.selectNote.bind(this)}
              viewer={this.props.viewer}
            />

            <MainContent children={this.props.children} note={selectedNote} viewer={this.props.viewer} parentUrl={parentUrl} clearNote={this.handleClearNote.bind(this)}/>

        </div>
    )
  }

  handleEditTitle(e){

    this.setState({
    	course:{title:e.target.value},
    	status: <Status type="changes-not-saved"/>
    	})
  }

  handleUpdateTitle(){
    console.log('off focus save', this.state.course.title, this.props.viewer.course.id)
    this.setState({status: <Status type="saving"/>})

    Relay.Store.commitUpdate(new CourseUpdateMutation({
    	title: this.state.course.title,
      course: this.props.viewer.course
    	}))

  }

  toggleSideBar(){
   this.setState({sideBarState: !this.state.sideBarState})
  }

  toggleNoteDrawer(){
   this.setState({noteDrawerState: !this.state.noteDrawerState})
  }

  selectNote(e){
    console.log('selecting note: ', e.target)
   this.props.relay.setVariables({
     noteId: e.target.id
   })

  }

handleClearNote(){
  this.props.relay.setVariables({
    noteId: ""
  })
}

}

CourseEditor.contextTypes = {
   router: React.PropTypes.object.isRequired
 }

CourseEditor.defaultProps = {
	course:{
	  id:88,
	  title:"",
	  stepsCount:10,
	  steps: [],
    lessonId: "1"
	}
}

CourseEditor.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
}
//
export default Relay.createContainer(CourseEditor, {
  initialVariables: {
	courseId: "1",
  lessonId: "1",
  filter:"deliverance",
  pageSize:5,
  noteId:""
  },
  prepareVariables: prevVariables => {

    let lid = prevVariables.lessonId

    if(lid === undefined){
      lid = {lessonId:"aasdlfkasjdflakdsjf"}
    }

    return {
      ...prevVariables,
      lid
    }
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      ${SideBar.getFragment('viewer')}
      ${MainContent.getFragment('viewer')}

      courses(first:1, id: $courseId) {
        edges{
          node{
            ${CourseUpdateMutation.getFragment('course')}
            ${SideBar.getFragment('course')}
            id
            title
            lessonsCount
            lessons (first:100){
              pageInfo
              edges{
                cursor
                node{
                  id
                }
              }
            }
          }
        }
    }

    lessons(first: 1, id:$lid){
      edges{
        cursor
        node{
          id
        }
      }
    }

    notes(first:$pageSize, id:$noteId){
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
      edges{
        cursor
        node{
          id
          tags
          type
          ${MainContent.getFragment('note')}
        }
      }
    }

  }`
 },
})
