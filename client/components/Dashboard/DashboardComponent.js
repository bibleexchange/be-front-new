import React from 'react';
import { Link } from 'react-router';
import './Dashboard.scss';
import ChainLink from '../Svg/ChainLink'

class Dashboard extends React.Component {

  render() {
    let deleteBookmark = this.props.deleteBookmark

    return (
	      <ul id='dashboard' >
            <button id='bookmark-it' onClick={this.props.handleBookmark} />

            <li><Link className="dashboard" to={'/bible/'+this.props.reference}>HOLY BIBLE</Link></li>
            <li><Link className="dashboard" to='/courses'>COURSES</Link></li>
            <li><Link className="dashboard" to='/audio'>AUDIO LIBRARY</Link></li>

            {this.props.navs.map(function (value, key) {
              return <li key={key}><button className="delete-it" onClick={deleteBookmark} data-id={key}>X</button><Link to={value} >{value} <ChainLink /></Link></li>;
            })}
        </ul>
    );
  }

}

Dashboard.defaultProps = {};

export default Dashboard
