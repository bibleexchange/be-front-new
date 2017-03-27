import React from 'react'
import Lesson from './Lesson'
import ModalComponent from '../App/ModalComponent'

class List extends React.Component {

  render() {
  let baseUrl = this.props.baseUrl
	const closeAll = this.props.close;

    return (<div id="lessons-modal" >
        			<h4>Choose a Lesson</h4>

              <ol>
          			{this.props.course.lessons.edges.map(function(lesson) {
                    return <li key={lesson.node.id}><h2 ><Lesson lesson={lesson.node} closeAll={closeAll} baseUrl={baseUrl+"/lesson/"+lesson.node.id}/></h2></li>;
          			})}
              </ol>

        		</div>)
  }

}

export default class LessonsList extends React.Component {

  render() {
    return (<ModalComponent
              close={this.props.close}
              shouldDisplay={this.props.shouldDisplay}
              component={<List {...this.props}/>}
            />)
  }

}
