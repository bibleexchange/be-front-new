import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class NoteUpdateMutation extends Relay.Mutation {

static fragments = {
userNote: () => Relay.QL`fragment on UserNote {id, type, body, tags_string }`,
};

getMutation() {
return Relay.QL`mutation NoteUpdate {userNoteUpdate}`;
}

getVariables() {
return {
token: auth.getToken(),
id: this.props.note.id,
body: this.props.changedNote.body,
title: this.props.changedNote.title,
tags_string: this.props.changedNote.tags,
type: '',
reference: this.props.changedNote.reference
};
}

getFatQuery() {
return Relay.QL`fragment on NoteUpdatePayload {error, code, myNotes, note {id, type, body, tags_string }}`;
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
	type: this.props.changedNote.type,
	body: this.props.changedNote.body,
	tags_string: this.props.changedNote.tags,
	type: '',
	reference: this.props.changedNote.reference
}
};
}

}
