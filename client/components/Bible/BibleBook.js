import React from 'react';
import BibleChaptersList from './BibleChaptersList';

export default class BibleBook extends React.Component {

  constructor(props) {
	                                                                                                                                                                                                        super(props);
	                                                                                                                                                                                                        this.state = {
		                                                                                                      collapsed: false,
		};
  }

  toggleChapter(e) {
	                                                                                                                                                                                                        e.preventDefault();
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  toggleChapterAlways(e) {
    const collapsed = false;
    this.setState({ collapsed });
    this.props.closeAll();
  }

  render() {
	                                                                                                                                                                                                        const { collapsed } = this.state;

    let chaptersStyle = {
	                                                                                                                                                                                                                                                                                                        display: 'block'
    };

    if (!this.state.collapsed) {
      chaptersStyle.display = 'none';
    }
    let brk = '';

    if (this.props.book.title === 'Genesis' || this.props.book.title === 'Matthew') {
      brk = ' break-here';
    } else {
      brk = '';
    }

	                                                                                                                                                                                                        return (
		<div className={'bookselect' + brk}>
		  <a className='bookname' onClick={this.toggleChapter.bind(this)} href='#'>
			<strong>{this.props.book.title}</strong>
		  </a>
		  <ul id='book-menu' style={chaptersStyle} role='menu' >
			<BibleChaptersList book={this.props.book} toggle={this.toggleChapterAlways.bind(this)} />
		  </ul>
		</div>
		);
  }
}
