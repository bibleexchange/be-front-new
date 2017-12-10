import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';

class MyNotes extends React.Component {

  render() {
      let notes = this.props.myNotes.edges
      let nextButton = null

      if(this.props.myNotes.pageInfo.hasNextPage){
       nextButton = <button onClick={this.props.handleMoreMyNotes}>more</button>
      }

    return (
    <div id="dashoard-menu" style={{backgroundColor:"white"}}>
        <h1>Search My Notes ({this.props.myNotes.totalCount}): <input type="text" name="search-menu" onChange={this.props.handleUpdateMyNoteFilter} value={this.props.myNotesWidget.filter}/>     
</h1>

        
        <ul id="menu">

        {notes.map(function(n){
          return <li key={n.node.id}><Link to={"/notes/"+ n.node.id}>{n.node.title} ({n.node.author.name})</Link></li>
        })}

        </ul>

          {nextButton}

        </div>)
  }


}

MyNotes.propTypes = {
  user: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

MyNotes.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default createFragmentContainer(MyNotes, {
    user: graphql`
    fragment MyNotes_user on User {
      authenticated
      name
      email
    }
  `,

  userNotes: graphql`
    fragment MyNotes_userNotes on NoteConnection {
          totalCount

          pageInfo{
            hasNextPage
          }
          edges{
              node {
                  id
                  title
                  verse {id, reference}
                  author {name}
              }
    }
    }`,

});
