import React from 'react';
import './Footer.scss';
import Relay from 'react-relay';

class Footer extends React.Component {

  render() {

	if(this.props.loggedIn & this.props.user !== null){
		var user = this.props.user;
		var usingAs = <a href={user.email}> {user.name}</a>;
	}else {
		var user = {email:"guest", name:"guest"};
		var usingAs = "a guest";
	}

    return (
	   <center>Using Bible exchange as {usingAs}</center>
    );
  }
}

Footer.propTypes = {
    user: React.PropTypes.object.isRequired,
  };

export default Relay.createContainer(Footer, {
  initialVariables: {
	slug:''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	email
      	name
      	authenticated
      }
    `,
  },
});
