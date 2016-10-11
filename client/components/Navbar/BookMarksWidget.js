import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class BookMarksWidget extends React.Component {

  render() {

    return (
      <ul>
        {this.props.navs.map(function(value, key){
        return <li key={key}><Link to={value} >{value}</Link></li>;
      })}
      </ul>
    );
  }

}

BookMarksWidget.propTypes = {
    navs: React.PropTypes.array.isRequired
};


export default BookMarksWidget;
