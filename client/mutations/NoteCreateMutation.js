import Relay from 'react-relay';

export default class NoteCreateMutation extends Relay.Mutation {

    static fragments = {
        notes: () => Relay.QL`fragment on SimpleNoteConnection {
                pageInfo{hasNextPage}
                edges{
                    cursor
                    node {
                        id
                        title
                        verse {id, reference}  
                    }
                }
         }`,
    };

    getMutation() {
        return Relay.QL`mutation NoteCreate {noteCreate}`;
    }

    getVariables() {
        return {
            id: this.props.newNoteEdge.id,
            body: JSON.stringify(this.props.newNoteEdge),
            title: this.props.newNoteEdge.title,
            tags_string: this.props.newNoteEdge.tags,
            type: this.props.newNoteEdge.type,
            reference: this.props.newNoteEdge.reference
        };
    }

    getFatQuery() {
        return Relay.QL`fragment on NoteCreatePayload {
            user { notes},
              error,
              code,
              clientMutationId
        }`
    }

    getConfigs() {
    // Behaviors can be one of 'append', 'ignore', 'prepend', 'refetch', or 'remove'.
        return [{
            type: 'RANGE_ADD',
            parentName: 'user',
            parentID: this.props.user.id,
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
         body: this.props.newNoteEdge.media,
         tags_string: this.props.newNoteEdge.tags
     }
     };
    }

}
