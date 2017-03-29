import Relay from 'react-relay';

export default class NoteUpdateMutation extends Relay.Mutation {

  static fragments = {
    note: () => Relay.QL`fragment on Note {id, type, body, tags_string}`,
  };

  getMutation() {
	                                                                                                                                                                                                          return Relay.QL`mutation NoteUpdate {noteUpdate}`;
  }

  getVariables() {
	                                                                                                                                                                                                        return {
	                                                                                                            id: this.props.note.id,
  type: this.props.newNote.type,
  body: this.props.newNote.body,
  tags_string: this.props.newNote.tags_string,
  bible_verse_id: this.props.bibleVerse.id
	    };
  }

  getFatQuery() {
	                                                                                                                                                                                                          return Relay.QL`fragment on NoteUpdatePayload {note {id, type, body, tags_string}}`;
  }

  getConfigs() {
	                                                                                                                                                                                                        return [{
	                                                                                                      type: 'FIELDS_CHANGE',
	                                                                                                      fieldIDs: { note: this.props.note.id }
	}];
  }

  getOptimisticResponse() {
	                                                                                                                                                                                                          return {
  note: {
    id: this.props.note.id,
    type: this.props.newNote.type,
    body: this.props.newNote.body,
    tags_string: this.props.newNote.tags_string
  }
};
  }

}
