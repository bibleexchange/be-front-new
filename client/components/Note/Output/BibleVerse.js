import React from 'react';
import { Link } from 'react-router';

function slugIt(string){
  return string.toLowerCase().split(' ').join('');
}

class BibleVerseNoteComponent extends React.Component {

  render() {

    return (
	<div style={{margin:"15px", fontSize:"1.3em"}}>
	  <Link to={"/bible/"+slugIt(this.props.bibleVerse.reference)} style={{color:"black"}}>
	    <p id={this.props.bibleVerse.id} className="ui-widget-content">
	      <sup>{this.props.bibleVerse.order_by}</sup>{this.props.bibleVerse.body}
	    </p>
	  </Link>
	</div>
    )
  }
}

export default BibleVerseNoteComponent;
