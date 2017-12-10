import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import NotesWidget from './NotesWidget';

class NotesIndex extends React.Component {

  componentWillMount(){
    this.props.handleUpdateNoteFilter(this.props.params.filter)
  }

  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                <NotesWidget
                  filter={this.props.params.filter}
                  notes={this.props.notes}
                  selectNote={this.props.handleEditThisNote}
                  tags
                  handleUpdateNoteFilter={this.props.handleUpdateNoteFilter}
                  handleNextNotePage={this.props.handleNextNotePage}
                  status={this.props.notesWidget}
                  handleNotesAreReady={this.props.handleNotesAreReady}
                  user={this.props.user}
                  />
              </div>
       	</div>
    );
  }

}

NotesIndex.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(NotesIndex, {
    notes: () => Relay.QL`fragment on NoteConnection {
      ...NotesWidget_notes
    }`,
    user: () => Relay.QL`fragment on User {
      ...NotesWidget_user
    }`
});
