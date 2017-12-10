import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import NoteViewer from '../Note/NoteViewer';

class LessonListComponent extends React.Component {

  render() {
    const baseUrl = this.props.baseUrl;
    return (
              <div>
                <h2><Link to={this.props.baseUrl + '/lesson/' + this.props.lesson.id}>LESSON: {this.props.lesson.order_by} ({this.props.lesson.notesCount} Notes)</Link></h2>
                <h3>{this.props.lesson.title}</h3>
                  <p style={{ textAlign: 'center' }}>{this.props.lesson.summary}</p>
                {this.props.lesson.notes.edges.map(function (note) {
                  return <NoteViewer key={note.node.id} note={note.node.note} baseUrl={baseUrl} />;
                })}

              </div>
    );
  }

}


LessonListComponent.propTypes = {
  lesson: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(LessonListComponent, {
  /* TODO manually deal with:
  initialVariables: {
    courseId: '1',
  }
  */
  lesson: graphql`
      fragment LessonListComponent_lesson on Lesson {
        id
        order_by
        title
        description
    }`,
});
