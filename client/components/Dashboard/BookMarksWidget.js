import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class BookMarksWidget extends React.Component {

  render() {

    return (
      <div>
      <center><h1>{this.props.user.name}&apos;s Bookmarks</h1></center>

        {this.props.navs.map(function(el){
        return <li key={el.node.id}><Link to={el.node.url} >{el.node.title}</Link></li>;
      })}
      </div>
    );
  }

}

BookMarksWidget.propTypes = {
    user: React.PropTypes.object.isRequired,
    navs: React.PropTypes.array.isRequired
};


export default BookMarksWidget;
