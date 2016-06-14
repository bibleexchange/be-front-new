import Relay from 'react-relay';

export default {
  viewer: (Component) => Relay.QL`
    query {
      viewerQuery (courseId:1){
        ${Component.getFragment('viewer')}
      }
    }
  `
}; 