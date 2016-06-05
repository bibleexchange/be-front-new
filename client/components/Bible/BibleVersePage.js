import React from 'react';
import { browserHistory, Link } from "react-router";
import Navigation from './Navigation';
import Reader from './Reader';
import BibleVerseFocus from './BibleVerseFocus';
import NoteComponent from './Note';
import BibleActionCreators from '../../actions/BibleActionCreators';
import SearchActionCreators from '../../actions/SearchActionCreators';

import BibleStore from '../../stores/BibleStore';
import BibleChapterStore from '../../stores/BibleChapterStore';
import BibleVerseStore from '../../stores/BibleVerseStore';
import SearchStore from '../../stores/SearchStore';

class BibleVersePage extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		BibleActionCreators.getVerseByReference(this.props.params.book.replace(/[ .]*/g,''), this.props.params.chapter, this.props.params.verse);
	}

	_getState() {
		return {
			verse: BibleVerseStore.getAll()
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);
		BibleVerseStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillReceiveProps(newProps){
		BibleActionCreators.getVerseByReference(newProps.params.book, newProps.params.chapter, newProps.params.verse);
	}
	
	componentWillUnmount(){
		BibleVerseStore.removeChangeListener(this._onChange);
	}
	
  render() {
	let NoteComponents = null;
	
	if(this.state.verse.notes && this.state.verse.notes !== null){
		NoteComponents = this.state.verse.notes.map((note)=>{
			return <NoteComponent key={note.id} {...note} verse={this.state.verse}/>;
		});
	}
	
    return (
      <div className="container">
		<BibleVerseFocus data={this.state.verse} />
		{NoteComponents}
      </div>
    )
  }
	
}

module.exports = BibleVersePage;