import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import WebPreview from '../WebPreview';

class ExternalLinkNote extends React.Component {
	
  render() {	
    return (<WebPreview url={this.props.data.relatedObject.url}/>);
  }
  
}

module.exports = ExternalLinkNote;