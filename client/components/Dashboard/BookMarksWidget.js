import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class BookMarksWidget extends React.Component {

  render() {
    let navs = localStorage.getItem('navs');
    return (
      <div>
      <center><h1>{this.props.user.name}&apos;s Bookmarks</h1></center>

      {this.props.navs.map(function(loc){
        return <li><Link to={loc}>{loc}</Link></li>;
      })}

        {this.props.user.navHistory.edges.map(function(el){
        return <li key={el.cursor}><Link to={el.node.url} >{el.node.title}</Link></li>;
      })}
      </div>
    );
  }

}

BookMarksWidget.propTypes = {
    user: React.PropTypes.object.isRequired,
    navs: React.PropTypes.array.isRequired
};


export default Relay.createContainer(BookMarksWidget, {
  initialVariables: {
	  libraryFilter:'',
	  reference:'john_3_16',
  	token: "nothinghere"
  },
  fragments: {
      user: () => Relay.QL`fragment on User {
	       name
         navHistory(first:5){
           edges{
             node{
               url
               title
             }
           }
         }
       }`
  },
});
