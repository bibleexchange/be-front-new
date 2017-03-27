import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import auth from '../App/auth';

class NoteCreatorPage extends React.Component {

  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>

              </div>
       	</div>
    );
  }
}

NoteCreatorPage.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NoteCreatorPage, {
  initialVariables: {
  	                                                                                                    userId: '55555',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user {
          id
          authenticated
        }
        notes(user:true, first:5){
          pageInfo{
            hasNextPage
            hasPreviousPage
            endCursor
          }
          edges{
            node{
              id
              tags_string
              author{
                id
                name
              }
            }
          }
        }
      }`,

  },
});
