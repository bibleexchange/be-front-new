import Relay from 'react-relay';

export default class NoteDestroyMutation extends Relay.Mutation {

  static fragments = {
    userNote: () => Relay.QL`fragment on UserNote {id}`,
  };

  getMutation() {
  return Relay.QL`mutation NoteDestroy {userNoteDestroy}`;
  }

  getVariables() {
  return {
  id: this.props.note.id
  };
  }

  getFatQuery() {
  return Relay.QL`fragment on NoteDestroyPayload {
  destroyedNoteID
  }`;
  }

  getConfigs() {
  return [{
  type: 'REQUIRED_CHILDREN',
  // Forces these fragments to be included in the query
  children: [Relay.QL`
  fragment on NoteDestroyPayload {
  destroyedNoteID
  }
  `],
  }];
  }

  getOptimisticResponse() {
  return { note: null };
  }
  }
