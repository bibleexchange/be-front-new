import React from 'react';
import { Link } from 'react-router';

function slugIt(string) {
  return string.toLowerCase().split(' ').join('_').replace(':', '_');
}

class BibleVerseNoteComponent extends React.Component {

  render() {
    return (
	<div className='bibleverse'>
	  <Link to={'/bible/' + slugIt(this.props.bibleVerse.reference)} style={{ color: 'black' }}>
	    <p id={this.props.bibleVerse.id} >
	      <sup>{this.props.bibleVerse.order_by}</sup>{this.props.bibleVerse.body}
	    </p>
	  </Link>
	</div>
    );
  }
}

export default BibleVerseNoteComponent;
