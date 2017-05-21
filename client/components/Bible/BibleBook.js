import React from 'react';
import RightArrow from '../Svg/RightArrow'

export default class BibleBook extends React.Component {

componentWillMount() {
  this.state = {
  collapsed: false,
  };
}

  toggleChapter(e) {
	                                                                                                                                                                                                        e.preventDefault();
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });

    this.props.handleChapter(e)
  }

  render() {
	                                                                                                                                                                                                        const { collapsed } = this.state;
    let chaptersStyle = {
	                                                                                                                                                                                                                                                                                                        display: 'block'
    };

    if (!this.state.collapsed) {
      chaptersStyle.display = 'none';
    }
	                                                                                                                                                                                                        return (
		<div className={'bookselect'}>
		  <button 
        className='bookname' 
        onClick={this.toggleChapter.bind(this)} 
        data-title={this.props.book.title} 
        data-chaptercount={this.props.book.chapterCount}
        >{this.props.book.title} <RightArrow fill={"red"}/></button>
		</div>
		);
  }
}

//
// 