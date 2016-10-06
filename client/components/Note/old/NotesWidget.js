import React from 'react';
import Relay from 'react-relay';
import NotesWidgetComponent from './NotesWidgetComponent';
import NotePreview from './NotePreview';

NotesWidgetComponent.propTypes = {
   viewer: React.PropTypes.object.isRequired
};

export default Relay.createContainer(NotesWidgetComponent, {
  initialVariables: {
    startCursor : null,
    pageSize: 5
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer  {
      	 notes (first:$pageSize, after:$startCursor){
      	   edges {
      	     cursor
      	     node {
      	       id
      	       body
              ${NotePreview.getFragment('note')}
             }
      	   }
	 }
     }`
  }
});
