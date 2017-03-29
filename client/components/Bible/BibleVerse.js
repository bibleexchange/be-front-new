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

	      <Link to={!this.props.bibleVerse.url ? '' : this.props.bibleVerse.url} >
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
    if (this.props.viewer.user.authenticated === 'true') {
      this.setState({ noteStatus: !this.state.noteStatus });
    }
  }

  clearVerseForm(e) {
    this.setState({ noteStatus: false });
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
     }`,
    viewer: () => Relay.QL`
      fragment on Viewer  {
        user{authenticated}
     }`
  },

});
