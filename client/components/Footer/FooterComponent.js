import React from 'react';
import './Footer.scss';
import Relay from 'react-relay';

class Footer extends React.Component {

  render() {
	
	if(this.props.viewer.authenticated){
		var user = this.props.viewer;
		
		var usingAs = <a href={user.email}> {user.name}</a>;
		
	}else {
		var user = {email:"guest", name:"guest"};
		var usingAs = "a guest";
	}
	  
    return (	  
	   <center className="redBG">
		Using Bible exchange as {usingAs}
	   </center>
    );
  }
}

Footer.propTypes = {
    viewer: React.PropTypes.object.isRequired,
  };

export default Relay.createContainer(Footer, {
  initialVariables: {
	slug:''
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
	email	
	name
	authenticated
      }
    `,
  },
});
