/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import Navigation from './Navigation';
import BibleWidget from '../Bible/WidgetComponent';
import BibleVerse from '../Bible/BibleVerse';
import NoteViewer from '../Note/NoteViewer';
import marked from 'marked';

import './Lesson.scss';

class LessonComponent extends React.Component {
  render() {

    let nextButton = null;

    if(this.props.lesson.notes.edges.length < this.props.lesson.notesCount){
      nextButton = <button onClick={this.handleNoteLoad.bind(this)}>Get {this.props.lesson.notes.edges.length + 1} of { this.props.lesson.notesCount}</button>;
    }else{
      nextButton = <div dangerouslySetInnerHTML={{__html: "<center>THE END</center>"}} />;
    }

      return (
        <div style={{padding:"15px"}}>
          {this.props.lesson.notes.edges.map(function(note){
            return <NoteViewer key={note.node.id} note={note.node.note} />;
          })}

          {nextButton}

        </div>
    );
  }

  handleNoteLoad() {
    // Increments the number of stories being rendered by 10.
    this.props.relay.setVariables({
      pageSize: this.props.relay.variables.pageSize + 1
    });
  }

}

LessonComponent.propTypes = {
  lesson: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(LessonComponent, {
  initialVariables: {
    pageSize: 1,
    opaqueCursor: "opaqueCursor",
  },
  fragments: {
      lesson: () => Relay.QL`fragment on Lesson {
        id
        order_by
        title
        summary
        notesCount
        next{id, title}
        previous{id, title}
        notes(first:$pageSize){
          edges {
            cursor
            node {
              id
              next {
                id
              }
              note {
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
});
