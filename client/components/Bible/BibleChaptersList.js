import React from 'react';
import { Link } from 'react-router';
import Helpers from '../Helpers.js';

export default class BibleChaptersList extends React.Component {
  render() {
	                                                                                                                                                                                                        var book = this.props.book;
	                                                                                                                                                                                                        var chapters = [];

	                                                                                                                                                                                                        for (var i = 1; i <= book.chapterCount; i++) { chapters.push(i); }
	                                                                                                                                                                                                        const toggle = this.props.toggle;
	                                                                                                                                                                                                        const getChapter = this.props.getChapter;

    return (
<div>
{chapters.map(function (chapter) {
  return (
	<li className='square-list' key={chapter}>
		<Link to={'/bible/' + Helpers.slugIt(book.title) + '_' + chapter} id={chapter} onClick={toggle.bind(this)}>
			{chapter}
		</Link>
	</li>
 ); })}
</div>

    );
  }
}
