import Relay from 'react-relay';
import auth from '../components/App/auth'

export default class NoteCreateMutation extends Relay.Mutation {

    static fragments = {
        notes: () => Relay.QL`fragment on NoteConnection {
                pageInfo{hasNextPage}
                edges{
                    cursor
                    node {
                        id
                        title
                        verse {id, reference}  
                        output
                    }
                }
         }`,
    };

    getMutation() {
        return Relay.QL`mutation NoteCreate {noteCreate}`;
    }

    getVariables() {
        return {
            token: auth.getToken(),
            id: this.props.newNoteEdge.id,
            body: this.props.newNoteEdge.body,
            title: this.props.newNoteEdge.title,
            tags_string: this.props.newNoteEdge.tags,
            type: this.props.newNoteEdge.type,
            reference: this.props.newNoteEdge.reference
        };
    }

    getFatQuery() {
        return Relay.QL`fragment on NoteCreatePayload {
              error,
              code,
              clientMutationId,
              newNoteEdge{node{id, title, body, verse {id,reference}, output}},
              myNotes {edges{node{id, title, body}}},
              token
        }`
    }

    getConfigs() {
    // Behaviors can be one of 'append', 'ignore', 'prepend', 'refetch', or 'remove'.
        return [{
            type: 'RANGE_ADD',
            parentName: 'myNotes',
            parentID: this.props.notes,
            connectionName: 'notes',
            edgeName: 'newNoteEdge',
            rangeBehaviors: {
                '': 'append',
                'status(any)': 'append',
                'status(active)': 'append',
                'status(completed)': 'ignore',
            },
        }]
    }
    getOptimisticResponse() {
     return {
         noteEdge: {
         id: btoa("arrayconnectionNewCursor:100000000"),
         body: this.props.newNoteEdge.body,
         tags_string: this.props.newNoteEdge.tags
     }
     };
    }

}
