import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteViewer from './NoteViewer';
import NoteOptions from './NoteOptions';

class NotePageComponent extends React.Component {

  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                <NoteOptions note={this.props.viewer.notes.edges[0].node} viewer={this.props.viewer} />
                <NoteViewer note={this.props.viewer.notes.edges[0].node} viewer={this.props.viewer} />
              </div>
       	</div>
    );
  }
}

NotePageComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NotePageComponent, {
  initialVariables: {
  	                                                                                                    noteId: '55555',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user {
          authenticated
        }
        ${NoteViewer.getFragment('viewer')}
        ${NoteOptions.getFragment('viewer')}
        notes(first:1, id:$noteId){
          edges{
            node{
              ${NoteViewer.getFragment('note')}
              ${NoteOptions.getFragment('note')}
            }
          }

        }
      }`,

  },
});
