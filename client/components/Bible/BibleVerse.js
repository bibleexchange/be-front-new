import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class BibleVerseComponent extends React.Component {

  componentWillMount() {
    this.state = {
      noteStatus: true
    };
  }

  render() {
    return (
	<div>

	    <p id={this.props.bibleVerse.id} >

	      <Link activeClassName="active-verse" to={!this.props.bibleVerse.url ? '' : this.props.bibleVerse.url} >
          <sup>{this.props.bibleVerse.order_by}</sup>
        </Link>

        <span onClick={this.clickVerseBody.bind(this)} data-verseid={this.props.bibleVerse.id}>
           &nbsp; {this.props.bibleVerse.body} [{this.props.bibleVerse.notesCount}]
        </span>

      </p>

	</div>
    );
  }

  clickVerseBody(e) {
    if (this.props.user.authenticated === 'true') {
      this.setState({ noteStatus: !this.state.noteStatus });
    }
  }

  clearVerseForm(e) {
    this.setState({ noteStatus: false });
  }

}

BibleVerseComponent.propTypes = {
    bibleVerse: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
};

export default BibleVerseComponent