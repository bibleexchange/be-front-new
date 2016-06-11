import React from 'react';
import './Footer.scss';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (	  
	   <Grid fluid className="redBG">
			<Row>
			  <Col xs={6} xsOffset={5}> 
				<span>Using Bible exchange as <a href={this.props.viewer.email}> @{this.props.viewer.username}</a></span>
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