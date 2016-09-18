/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Note from '../Bible/Note';

import './Library.scss';

class BrowserWidget extends React.Component {

  componentWillMount(){
	   this.state = {
      oembed:[]
    };
  }

  render() {

    return (
  		<div>
        <h2 style={{textAlign:"center"}}>Previewer</h2>

        <input type="text" onBlur={this.myFunc.bind(this)} />

        <textarea value={JSON.stringify(this.state.oembed)}></textarea>

  		</div>
    )
  }

  myFunc(){
    let url = "http://api.soundcloud.com/users/130712524/tracks?client_id=2dc887a365f4c737b309f890a7ea8584&offset=300";
    let that = this;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (!xhr) {
      throw new Error('CORS not supported');
    }

    xhr.onload = function() {
     that.setState({oembed:xhr.response, status:"close"});
    };

    xhr.open('GET', url);
    xhr.send();

    console.log(xhr);
  }

}


class Library extends React.Component {

  componentWillMount(){
	this.state = {
	  showModal:false,
	  filterNotesBy:""
	};
  }

  render() {
	let filterBy = this.state.filterNotesBy.toLowerCase();
  let notes = this.props.bibleVerse.notes.edges;

       return (
		<div>

      <BrowserWidget />

			<h2>Notes for {this.props.bibleVerse.reference}</h2>
			<hr />
			<input type="text" onChange={this.handleLibraryFilter.bind(this)} placeholder="  filter" value={this.state.filterNotesBy} style={{marginLeft:"50px"}}/>
			<Link to="" onClick={this.handleClearFilter.bind(this)} >&nbsp;&nbsp;clear</Link>
			<hr />

			{notes.filter(function(el){return el.node.body.includes(filterBy)}).map((n)=>{
				return <Note key={n.node.id} note={n.node} />;
			})}

		</div>
    )
  }


  handleLibraryFilter(event){
   // event.preventDefault();
    this.setState({ filterNotesBy: event.target.value });
}

  handleClearFilter(event){
   event.preventDefault();
    this.setState({ filterNotesBy: "" });
}
}

Library.propTypes = {
   bibleVerse: React.PropTypes.object.isRequired
};

Library.defaultProps = {bibleVerse: {reference:null}};

export default Relay.createContainer(Library, {
  initialVariables: {
    opaqueCursor : null
  },
  fragments: {
    bibleVerse: () => Relay.QL`
      fragment on BibleVerse  {
	 reference
	 notes (first:45, after:$opaqueCursor){
	   edges {
	     cursor
	     node {
	       id
	       body
               ${Note.getFragment('note')}
             }
	   }
	  }
     }`
  }
});
