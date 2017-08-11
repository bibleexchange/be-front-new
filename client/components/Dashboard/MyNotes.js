import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NotesWidget from '../Note/NotesWidget';

class MyNotes extends React.Component {

    render() {
console.log(this.props)
        return (
            <div>

              <NotesWidget
                    status={this.props.myNotesWidget}
                    notes={this.props.myNotes}
                    selectNote={this.props.handleEditThisNote}
                    handleUpdateNoteFilter={this.props.handleUpdateMyNoteFilter}
                    handleNextNotePage={this.props.moreMyNotes}
                    handleNotesAreReady={this.props.handleNotesAreReady}
                    user={this.props.user}
                  />

            </div>
        );
    }

}

MyNotes.propTypes = {
  user: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

MyNotes.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Relay.createContainer(MyNotes, {

  fragments: {
      user: () => Relay.QL`
      fragment on User {
        ${NotesWidget.getFragment('user')}
        authenticated
        name
        email
      }
    `,

    myNotes: () => Relay.QL`
      fragment on NoteConnection {
        ${NotesWidget.getFragment('notes')}
            pageInfo{hasNextPage}
            edges{
                node {
                    id
                    title
                    verse {id, reference}
                }
      }
      }`,

  }
});
