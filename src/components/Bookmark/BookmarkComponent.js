import React from 'react';
import { Link } from 'react-router';
import './Bookmark.scss';
import ChainLink from '../Svg/ChainLink'

class Bookmark extends React.Component {

  render() {
    let deleteBookmark = this.props.deleteBookmark

    return (
      <div id='bookmark-main' >

          <button id='bookmark-it' onClick={this.props.handleBookmark}><span> Bookmark => {this.props.location.pathname}</span></button>

	      <ul >

            <li><Link className="dashboard" to={'/bible/'+this.props.reference}>HOLY BIBLE</Link></li>
            <li><Link className="dashboard" to='/courses'>COURSES</Link></li>
            <li><Link className="dashboard" to='/audio'>AUDIO LIBRARY</Link></li>

            {this.props.bookmarks.map(function (value, key) {
              return <li key={key}><button className="delete-it" onClick={deleteBookmark} data-id={key}>X</button><Link to={value} >{value} <ChainLink /></Link></li>;
            })}
        </ul>
        </div>
    );
  }

}

Bookmark.defaultProps = {};

export default Bookmark
