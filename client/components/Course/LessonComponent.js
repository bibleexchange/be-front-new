/* eslint-disable global-require */
import React from 'react'
import { Link } from 'react-router'
import Relay from 'react-relay'
import NoteViewer from '../Note/NoteViewer'

import './Lesson.scss'

class LessonComponent extends React.Component {
  render() {

    let nextButton = null
    let viewer = this.props.viewer

    if(this.props.relay.variables.lessonPageSize < this.props.lesson.stepsCount){
      nextButton = <button style={{width:"100%"}} onClick={this.handleNoteLoad.bind(this)}>Load Step #{this.props.relay.variables.lessonPageSize+1} of { this.props.lesson.stepsCount}</button>
    }else{
      nextButton = <div dangerouslySetInnerHTML={{__html: "<center>THE END</center>"}} />
    }

      return (
        <div style={{padding:"15px"}}>
          {this.props.lesson.steps.edges.map(function(step){
            return <NoteViewer key={step.node.id} note={step.node.note} viewer={viewer} />
          })}

          {nextButton}

        </div>
    )
  }

  handleNoteLoad() {
    this.props.relay.setVariables({
      lessonPageSize: this.props.relay.variables.lessonPageSize + 1
    })
  }

}

LessonComponent.propTypes = {
  lesson: React.PropTypes.object.isRequired,
}

export default Relay.createContainer(LessonComponent, {
  initialVariables: {
    lessonPageSize: 1,
    opaqueCursor: "opaqueCursor",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        ${NoteViewer.getFragment('viewer')}
      }`,
      lesson: () => Relay.QL`fragment on Lesson {
        id
        order_by
        title
        summary
        stepsCount
        next{id, title}
        previous{id, title}
        steps(first:$lessonPageSize){
          pageInfo{
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              next {
                id
              }
              note {
                id
                ${NoteViewer.getFragment('note')}
              }
              previous {
                id
              }
            }
          }
        }
      }`,
    },
})
