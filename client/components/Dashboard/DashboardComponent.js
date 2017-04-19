import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import './Dashboard.scss';
import MagnifyingGlass from '../Svg/MagnifyingGlass';

class Search extends React.Component {

  render() {
    let that = 'p';
    return (
      <form id='main-search' onSubmit={this.props.searchIt} >
        <input id='search-text' type='text' name='search' placeholder='search notes...' onChange={this.props.handleUpdateSearch} />
          <Link to={'/notes/tag/' + this.props.search} >&nbsp;
            <MagnifyingGlass />
          </Link>
      </form>
    );
  }

}

class Dashboard extends React.Component {

  componentWillMount() {
    this.state = {
      filterBy: this.props.notesWidget.filter
    };
  }


  render() {

    return (
	      <div id='dashboard' >
        <Search handleUpdateSearch={this.handleUpdateSearch.bind(this)} searchIt={this.searchIt.bind(this)} search={this.state.filterBy} />
          <div className='WidgetContainer' >
            <div className='Widget'><h2><Link to={'/bible/'+this.props.reference}>HOLY BIBLE</Link></h2></div>
            <div className='Widget'><h2><Link to='/courses'>COURSES</Link></h2></div>
            <div className='Widget'><h2><Link to='/audio'>AUDIO LIBRARY</Link></h2></div>
  	      </div>
        </div>
    );
  }

  handleUpdateSearch(e) {
    this.setState({ filterBy: e.target.value.replace(/ /g, '_') });
  }

  searchIt(e) {
    e.preventDefault();
    this.props.handleUpdateNoteFilter(this.state.filterBy);
    this.context.router.push('/notes/tag/' + this.state.filterBy);
  }

}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Dashboard.defaultProps = {};

export default Relay.createContainer(Dashboard, {
fragments: {
viewer: () => Relay.QL`
fragment on Viewer {
  user{
    authenticated
  }
}`
}
});
