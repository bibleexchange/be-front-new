import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay/classic';

class BibleVerseComponent extends React.Component {

  render() {
    return (
	<div>

	    <p id={this.props.bibleVerse.id} >

	      <Link activeClassName="active-verse" to={!this.props.bibleVerse.url ? '' : this.props.bibleVerse.url} >
          <sup>{this.props.bibleVerse.order_by}&nbsp;</sup>
        </Link>

           <span>{this.props.bibleVerse.body} [{this.props.bibleVerse.notesCount}]</span>

      </p>

	</div>
    );
  }

}

BibleVerseComponent.propTypes = {
    bibleVerse: React.PropTypes.object.isRequired
};

export default BibleVerseComponent
