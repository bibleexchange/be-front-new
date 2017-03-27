import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
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

export default Relay.createContainer(LessonListComponent, {
  initialVariables: {
  	                                                                                                    courseId: '1',
  },
  fragments: {
    lesson: () => Relay.QL`
        fragment on Lesson {
          id
          order_by
          title
          summary
          stepsCount
          steps(first:100){
            edges{
              cursor
              node{
                id
                order_by
                note{
                  id
                	author{
                	  name
                	}
                  verse{
                    id
                    body
                    reference
                    url
                    notesCount
                    order_by
                  }
                  output{
                    type
                    api_request
                    body
                  }
                  ${NoteViewer.getFragment('note')}
                }
              }
            }
          }
      }`,
  },
});
