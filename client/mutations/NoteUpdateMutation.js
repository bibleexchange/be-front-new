import Relay from 'react-relay';

export default class NoteUpdateMutation extends Relay.Mutation {

static fragments = {
note: () => Relay.QL`fragment on Note {id, type, body, tags_string }`,
};

getMutation() {
return Relay.QL`mutation NoteUpdate {noteUpdate}`;
}

getVariables() {
return {
id: this.props.note.id,
body: JSON.stringify(this.props.changedNote),
title: this.props.changedNote.title,
tags_string: this.props.changedNote.tags,
type: this.props.changedNote.type,
reference: this.props.changedNote.reference
};
}

getFatQuery() {
return Relay.QL`fragment on NoteUpdatePayload {note {id, type, body, tags_string }}`;
}

getConfigs() {
return [{
type: 'FIELDS_CHANGE',
fieldIDs: { note: this.props.note.id }
}];
}
/*
getOptimisticResponse() {
return {
note: {
id: this.props.note.id,
type: this.props.changedNote.type,
body: this.props.changedNote.media,
tags_string: this.props.changedNote.tags_string
}
};
}
*/
}
