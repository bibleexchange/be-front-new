import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Bookmark from '../Bookmark/BookmarkComponent';

class MyBookmarks extends React.Component {

    render() {

        return (
           <Bookmark 
              bookmarks={this.props.bookmarks} 
              deleteBookmark={this.props.deleteBookmark} 
              handleBookmark={this.props.handleBookmark} 
              location={this.props.location}
              reference={"Genesis 1:1"}
              />
        );
    }

   
}

MyBookmarks.propTypes = {
  user: React.PropTypes.object.isRequired,
  bookmarks: React.PropTypes.array
};

MyBookmarks.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Relay.createContainer(MyBookmarks, {

  fragments: {
     
      user: () => Relay.QL`
      fragment on User {
        authenticated
        name
        email
      }
    `,

   

  }
});
