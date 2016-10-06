import React from 'react';
import { Link } from 'react-router';

class ExternalLinkNote extends React.Component {
	
  render() {	
    return (<div url={this.props.data.relatedObject.url}/>);
  }
  
}

module.exports = ExternalLinkNote;
