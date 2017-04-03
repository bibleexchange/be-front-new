import Relay from 'react-relay';

export default class NoteCreateMutation extends Relay.Mutation {

static fragments = {
note: () => Relay.QL`fragment on Note {
                id
                title
                type
                body
                tags_string
                verse{
                  id
                  reference
                }
              }`,
};

getMutation() {
return Relay.QL`mutation NoteCreate {noteCreate}`;
}

getVariables() {
return {
id: this.props.note.id,
type: this.props.note.type,
body: JSON.stringify(this.props.note),
tags_string: this.props.note.tags,
reference: this.props.note.reference
};
}

getFatQuery() {
return Relay.QL`fragment on NoteCreatePayload {bibleVerse {notesCount}, note{id, type, body, tags_string}}`;
}

getConfigs() {
return [{
type: 'FIELDS_CHANGE',
fieldIDs: { note: this.props.newNote.id }
}];
}

getOptimisticResponse() {
return {
note: {
id: this.props.note.id,
type: this.props.note.type,
body: JSON.stringify(this.props.note),
tags_string: this.props.note.tags
}
};
}

}
