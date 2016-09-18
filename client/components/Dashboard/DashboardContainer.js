import Relay from 'react-relay';
import Dashboard from './DashboardComponent';

export default Relay.createContainer(Dashboard, {
  initialVariables: {
    token:"dummystring"
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          user(token:$token){
            id
            authenticated
            name
            email
            navHistory(first:5){
              edges{
                cursor
                node{
                  id
                  url
                  title
                }
              }
            }
          }

      }
    `,
  },
});
