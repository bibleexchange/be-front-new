import Relay from 'react-relay';

export default class NoteCreateMutation extends Relay.Mutation {

  static fragments = {
   note: () => Relay.QL`fragment on Note {id, type, body, tags_string}`,
  };

  getMutation(){
	  return Relay.QL`mutation NoteCreate {noteCreate}`;
  }

  getVariables(){

	return {
	        id:this.props.newNote.id,
          type: this.props.newNote.type,
          body: this.props.newNote.body,
          tags_string: this.props.newNote.tags_string,
          bible_verse_id:this.props.bibleVerse.id
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on NoteCreatePayload {bibleVerse {notesCount}, note{id, type, body, tags_string}}`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {note:this.props.newNote.id}
	}];
  }

  getOptimisticResponse(){
	  return {
      bibleVerse: {
        notesCount: this.props.bibleVerse.notesCount+1,
      },
      note : {
        id: this.props.newNote.id,
        type:this.props.newNote.type,
        body:this.props.newNote.body,
        tags_string: this.props.newNote.tags_string
      }
  }
}

}
