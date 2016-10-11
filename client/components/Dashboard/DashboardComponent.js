import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';
import './Dashboard.scss';
const magnifyingGlass = require('../../assets/images/magnifying-glass.png');
import BeLogo from '../Svg/BeLogo';

import CourseImg from '../../assets/images/icons/course.jpg';
import NoteImg from '../../assets/images/icons/notes.jpeg';
import BibleImg from '../../assets/images/icons/good-book.png';

class Search extends React.Component {

  render() {
    return (
      <form id="main-search" onSubmit={this.props.searchIt} >
        <input id="search-text" type="text" name="search" placeholder="search..." onChange={this.props.handleUpdateSearch} />
          <Link to={"/notes/tag/"+this.props.search} >&nbsp;
            <img src={magnifyingGlass} id="magnifying-glass" />
          </Link>
      </form>
    )
  }

}

class Dashboard extends React.Component {

  componentWillMount(){

    let filterBy = localStorage.getItem('notes-filter');

    if(filterBy == undefined ){
      filterBy = null;
    }

    localStorage.setItem('notes-filter',filterBy);

    this.state = {
      filterBy:filterBy
    };
  }


  render() {

      let user = this.props.viewer.user;

    return (
	      <div id="dashboard" >

        <Search handleUpdateSearch={this.handleUpdateSearch.bind(this)} searchIt={this.searchIt.bind(this)} search={this.state.filterBy}/>





          <div className="WidgetContainer" >
            <div className="Widget"><h2><Link to="/bible"><img src={BibleImg}  /> HOLY BIBLE</Link></h2></div>
            <div className="Widget"><h2><Link to="/notes"> <img src={NoteImg}  /> NOTES</Link></h2></div>
            <div className="Widget"><h2><Link to="/courses"><img src={CourseImg} /> COURSES</Link></h2></div>

            {/*<div className="Widget"><h2><Link to="/user/settings">SETTINGS</Link></h2></div>*/}
  	      </div>
        </div>
    )
  }

  handleUpdateSearch(e){
    this.setState({filterBy:e.target.value.replace(/ /g,"+")});
  }

  searchIt(e){
    e.preventDefault();
    this.context.router.push("/notes/tag/"+this.state.filterBy);
  }

}

Dashboard.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Dashboard.defaultProps = {};

export default Relay.createContainer(Dashboard, {
  initialVariables: {
    pageNumber:"1",
    reference:"john_3_16"
},
  fragments: {
	viewer: () => Relay.QL`
	  fragment on Viewer {
      user{
        authenticated
      }
		}`
  }
});
