import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

class DefaultNote extends React.Component {
  render() {	
	
	let note = this.props.data;
	
    return (
			<Grid fluid>
			
			<Row>
				<Col xs={12}>
					<h2><i className="glyphicon glyphicon-chat"></i> {note.body}</h2>
					<Link to={note.verse.url}>{note.verse.reference}</Link> {note.verse.t}
				</Col>
			</Row>
		</Grid>		
    )
  }
 
}

module.exports = DefaultNote;