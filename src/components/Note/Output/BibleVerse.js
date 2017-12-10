import React from 'react';
import { Link } from 'react-router';

function slugIt(string) {
  return string.toLowerCase().split(' ').join('_');
}

class BibleVerseNoteComponent extends React.Component {

  render() {
    let reference = null

    if(this.props.fullReference !== undefined && this.props.fullReference == true){
      let url = "/bible/" + slugIt(this.props.bibleVerse.reference)

      reference = <Link to={url} > {this.props.bibleVerse.reference} </Link>;
    }

    return (
	<div style={{ margin: '15px', fontSize: '1.3em' }}>

    {reference}

	  <Link to={'/bible/' + slugIt(this.props.bibleVerse.reference)} style={{ color: 'black' }}>
	    <p id={this.props.bibleVerse.id} >
	      <sup>{this.props.bibleVerse.order_by}</sup> &nbsp;{this.props.bibleVerse.body}
	    </p>
	  </Link>
	</div>
    );
  }
}

export default BibleVerseNoteComponent;
