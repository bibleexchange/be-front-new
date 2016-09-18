import Relay from 'react-relay';

const token = "asdfasdfasdf";

export default {
  viewer: () => Relay.QL`query ViewerQuery {viewer}`,
};
