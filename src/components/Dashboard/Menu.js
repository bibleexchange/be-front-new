import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

class Menu extends React.Component {

  componentWillMount(){
    this.state = {
      filter: ""
    }
  }

  render() {

    let options = [
        "logout",
        "account",
        "bookmarks",
        "feed",
        "notes",
        "courses"
      ]

      let opt = options.filter(this.filterOptions.bind(this))

    return (<div id="dashoard-menu" style={{backgroundColor:"white"}}>
        <h1>My Menu {this.props.user.email}</h1>

        <input type="text" name="search-menu" onChange={this.updateFilter.bind(this)}/>

        <ul id="menu">

        {opt.map(function(o,i){
          return <li key={i}><Link to={"/me/"+ o}>{o}</Link></li>
        })}

        </ul>

        </div>)
  }

  updateFilter(event){
    let a = event.target.value

    let newState = this.state

    newState.filter = a

    this.setState(newState)
  }

  filterOptions(option){
    return option.includes(this.state.filter)
  }

}

Menu.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Menu.defaultProps = {
}

export default createFragmentContainer(Menu, {
    user: () => Relay.QL`fragment on User {
        id
        email
        name
        authenticated
    }`

});
