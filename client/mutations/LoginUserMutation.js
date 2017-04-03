import Relay from 'react-relay';

export default class LoginUserMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        error {
          code
          message
        }
        user{
          id
          name
          email
        }
      }`,
  };

//invalid field name on fat query error message will result if fieldIDs
// entered do not correspond to a fat query entry
// if nothing is here then only "mutationid" will be returned in response graphql query
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        token: "" ,
        error:{},
        message:"",
        code:"",
        user: this.props.viewer.user.id
      },
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateTokenPayload {
  	    token
        message
        code
  	    clientMutationId
  	    error{
          code
          message
        }
        user{
          id
          token
          name
          email
          authenticated
          nickname
        }
      }`;
  }

  getMutation() {
    return Relay.QL`mutation {createToken}`;
  }

  getVariables() {
    return { email: this.props.input.email, password: this.props.input.password };
  }

}
