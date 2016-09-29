import React from 'react';
import Relay from 'react-relay';
import NotesWidgetComponent from '../Note/NotesWidgetComponent';
import NotePreview from '../Note/NotePreview';

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
      fragment on BibleVerse  {
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
