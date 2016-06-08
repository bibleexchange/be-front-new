import React from 'react';
import ExternalLink from './ExternalLinkNote';
import Recording from './RecordingNote';
import Default from './DefaultNote';

class Note extends React.Component {

  render() {	  
    return (this.chooseType());
  }

	chooseType(){
		switch(this.props.object_type){
			case "Recording":
				return <Recording data={this.props} />;
				break;
			case "Link":
				return <ExternalLink data={this.props} />;
				break;
			default:
				return <Default data={this.props} />;
		}
		
	}  
  
}

module.exports = Note;