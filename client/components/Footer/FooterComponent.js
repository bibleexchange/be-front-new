import React from 'react';
import './Footer.scss';
import { Grid, Row, Col } from 'react-bootstrap';

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
	   <Grid fluid className="redBG">
			<Row>
			  <Col xs={6} xsOffset={5}> 
				<span>Using Bible exchange as {usingAs}</span>
			  </Col>
			</Row>
		</Grid>
    );
  }
}

Footer.propTypes = {
    viewer: React.PropTypes.object.isRequired,
  };

export default Footer;