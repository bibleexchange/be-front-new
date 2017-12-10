import React from 'react';
import BibleBook from './BibleBook';

export default class BibleBooksList extends React.Component {
  render() {
    const closeAll = this.props.closeAll;
    let filterBy = this.props.filterBy.toLowerCase();
    let books = [];

    if (this.props.bible !== null && this.props.bible.books !== null) {
      books = this.props.bible.books.edges;
    }

    let handleChapter = this.props.handleChapter

    return (
		<div>
{books.filter(function (el) { return el.node.title.toLowerCase().includes(filterBy); }).map(function (book, index) {
return <BibleBook book={book.node} key={index} closeAll={closeAll} index={index} handleChapter={handleChapter}/>;
})}
</div>

    );
  }
}
