import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class BibleVerseComponent extends React.Component {

  render() {

    return (
	<div style={{margin:"15px", fontSize:"1.3em"}}>
	  <Link to={!this.props.bibleVerse.url ? "":this.props.bibleVerse.url} style={{color:"black"}}>
	    <p id={this.props.bibleVerse.id} className="ui-widget-content">
	      <sup>{this.props.bibleVerse.order_by}</sup>{this.props.bibleVerse.body} [{this.props.bibleVerse.notesCount}]
	    </p>
	  </Link>
	</div>
    )
  }
}

export default Relay.createContainer(BibleVerseComponent, {
  initialVariables: {},
  fragments: {
  bibleVerse: () => Relay.QL`
      fragment on BibleVerse  {
	 id
  	 order_by
	 body
	 url
	 notesCount
     }`
  },
});
