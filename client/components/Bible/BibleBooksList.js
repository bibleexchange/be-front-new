import React from 'react';
import { Link } from "react-router";

function slugIt(string){
  return string.toLowerCase().split(' ').join('');
}

class BibleChaptersList extends React.Component {
  render() {
	var book = this.props.book;
	var chapters  = [];

	for (var i=1; i <= book.chapterCount; i++) {
		chapters.push(i);
	}
	
	const toggle = this.props.toggle;
	const getChapter = this.props.getChapter;
	
    return (
		<div>
			{chapters.map(function(chapter) {
			  return (
				<li className="square-list" key={chapter}>
					<Link to={"/bible/"+slugIt(book.n)+"_"+chapter} id={chapter} onClick={toggle.bind(this)}>
						{chapter}
					</Link>
				</li>
			 )})}
		</div>			

    )
  }
}

class BibleBook extends React.Component {
  
  constructor(props) {
	super(props);	
	this.state = {
		  collapsed: false,
		};
  }
	
  toggleChapter(e) {
	e.preventDefault(); 
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  
  toggleChapterAlways(e) {
    const collapsed = false;
    this.setState({collapsed});
    this.props.closeAll();
  }
  
  render() {
	const { collapsed } = this.state;
	const chaptersClass = collapsed ? "collapse" : "";
	
	return (
		<div className="bookselect">
		  <a className="" onClick={this.toggleChapter.bind(this)} href="#" style={{width:'75px', height:'50px', overflow:'hidden'}}>
			<div className="bookname"><strong>{this.props.book.n}</strong></div>
		  </a>
		  <ul className={"dropdown-menu" + chaptersClass} role="menu" >
			
			<BibleChaptersList book={this.props.book} toggle={this.toggleChapterAlways.bind(this)} />

		  </ul>
		</div>
		)
  }
}

class BibleBooksList extends React.Component {
  render() {
    const closeAll = this.props.closeAll;
    const getChapter = this.props.getChapter;
    let filterBy = this.props.filterBy.toLowerCase();

    return (
		<div>
			{this.props.bible.books.edges.filter(function(el){return el.node.n.toLowerCase().includes(filterBy);}).map(function(book) {
			  return <BibleBook book={book.node} key={book.id} closeAll={closeAll} />
			 })}
		</div>			

    )
  }
}

module.exports = BibleBooksList;
