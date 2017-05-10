import React from 'react';
import ModalComponent from '../App/ModalComponent';
import BibleBooksList from './BibleBooksList';
import Helpers from '../Helpers.js';
import { Link } from 'react-router';

class VerseSelectorComponent extends React.Component {

  componentWillMount(){
    this.state = {
      book: {
        title: "Genesis",
        chapterCount: 50
      }
    }
  }

  render() {

let bible = this.props.bible;
let chapters = null

if(this.props.bible !== null){
  let book = this.state.book
  chapters = this.renderChaptersList(book.title, book.chapterCount)
}
    return (
	    <div id="verse-selector">
       <section>
		    <input type='text' onChange={this.props.handleBooksFilter} placeholder='filter Bible books'></input>
      </section>
		  <section>
        <BibleBooksList bible={this.props.bible} filterBy={this.props.filterBooksBy} closeAll={this.props.close} handleChapter={this.handleChapter.bind(this)}/>
      </section>
      <section>
        <ul id='book-menu' role='menu' >
          {chapters}
        </ul>
      </section>
	</div>
    );
  }

  handleChapter(e){
    let d = e.target.dataset
    this.setState({book: {title: d.title, chapterCount: d.chaptercount}})
  }

  renderChaptersList(title, chapterCount){

    var chapters = [];

    for (var i = 1; i <= chapterCount; i++) { chapters.push(i); }

        return (
    <div>
      <h2>{title}</h2>
      
    {chapters.map(function (chapter) {
      return (
      <li className='square-list' key={chapter}>
        <Link to={'/bible/' + Helpers.slugIt(title) + '_' + chapter} id={chapter}>
          {chapter}
        </Link>
      </li>
     ); })}
     </div>
     )


  }

}


export default class VerseSelector extends React.Component {
  render() {
    return (<ModalComponent
      close={this.props.close}
      shouldDisplay={this.props.shouldDisplay}
      component={<VerseSelectorComponent {...this.props} />}
    />);
  }

}
