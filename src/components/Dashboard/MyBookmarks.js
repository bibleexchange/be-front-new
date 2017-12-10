import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
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

export default createFragmentContainer(MyBookmarks, {
   
    user: graphql`
    fragment MyBookmarks_user on User {
      authenticated
      name
      email
    }
  `,

 

});
