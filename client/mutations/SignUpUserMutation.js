import Relay from 'react-relay';

export default class SignUpUserMutation extends Relay.Mutation {

  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        token
      	name
      	email
        authenticated
      }`,
  };

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignUpUserPayload {
  	    user {
  	      id
          token
  	      name
  	      email
  	      authenticated
  	    }
  	    clientMutationId
  	    token
  	    error
  	    code
      }`;
  }

  getMutation() {
    return Relay.QL`mutation SignUpUserMutation {loginUser}`;
  }

  getVariables() {
	return { email: this.props.input.email, password: this.props.input.password };
  }

  getOptimisticResponse() {
     return {
       email: this.props.input.email,
       id: this.props.user.id
     };
   }

}
