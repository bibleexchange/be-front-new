import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query ViewerQuery {viewer}`,
  course: () => Relay.QL`query ViewerQuery {viewer}`,
};
