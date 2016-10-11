import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';

import './Navigation.scss';

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
console
    return (
	<div>
	{chapters.map(function(chapter) {
	  return (
		<li className="square-list" key={chapter}>

			<Link to={"/bible/"+slugIt(book.title)+"_"+chapter} id={chapter} onClick={toggle.bind(this)}>
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

let chaptersStyle = {
	display:"block"
};

if(!this.state.collapsed){
  chaptersStyle.display = "none";
}
 let listBreak = "";
if(this.props.book.title == "Matthew"){
  listBreak = <hr />;
}

	return (
		<div className="bookselect">
		{listBreak}
		  <a className="bookname" onClick={this.toggleChapter.bind(this)} href="#">
			<strong>{this.props.book.title}</strong>
		  </a>
		  <ul style={chaptersStyle} role="menu" >
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
    let books = [];

  if(this.props.bible !== null && this.props.bible.books !== null){
    books = this.props.bible.books.edges;
  }

    return (
		<div>
			{books.filter(function(el){return el.node.title.toLowerCase().includes(filterBy);}).map(function(book) {
			  return <BibleBook book={book.node} key={Math.random()} closeAll={closeAll} />;
			 })}
		</div>

    )
  }
}

class Search extends React.Component {
  render() {

	const styles = {
		formStyle : {
			display:'inline-block'
		},
		btnSubmitStyle : {
			border:'none',
			background:'transparent'
		},
		inputStyle: {height:'100%',  margin:'0',  border:'1.11px',  padding:'4.5px',  display:'inline-block',  verticalAlign:'middle', background:'transparent',  textAlign:'center', maxWidth:'150px', background:'rgba(255,255,255,.1)'}
	};
	let term = "TRY AGAIN!";
	if(this.props.term !== null){term = this.props.term;}

    return (
		<form id ="bibleSearch" role="search" style={styles.formStyle} onSubmit={this.props.submitHandler}>
			<input type="text" name="q" id="reference" value={term} onChange={this.props.changeHandler} onBlur={this.props.submitHandler}
				style={styles.inputStyle}
			></input>
		</form>

    )
  }
}

class VerseSelector extends React.Component {

  render() {

	const modalStyle = {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  verticalAlign: 'middle',
	  zIndex: '1000',
	  backgroundColor: 'rgba(0,0,0,0.5)',
	  width:"100%"
	};

	if(!this.props.shouldDisplay){
	 modalStyle.display = 'none';
	}

	const dialogStyle = {
	  position: 'relative',
	  border: '1px solid #e5e5e5',
	  backgroundColor: 'white',
	  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
	  padding: 20,
	  zIndex:1050,
	  marginLeft:"10%",
	  marginRight:"10%",
	  marginTop:"70px"
	};

	let bible = this.props.bible;

    return (
	  <div style={modalStyle}>
	    <div style={dialogStyle}>

		  <button onClick={this.props.close}>
		    <span>&times;</span>
		  </button>

		  <h4>Choose a book and chapter to open</h4>

		  <input type="text" onChange={this.props.handleBooksFilter} placeholder="  filter"></input>

		  <button>Old Testament</button>
		  <button>New Testament</button>
		  <button>Random</button>

		  <BibleBooksList bible={bible} filterBy={this.props.filterBooksBy} closeAll={this.props.close}/>
	  </div>
	</div>
    )
  }

}

class Navigation extends React.Component {

  componentWillMount(){
	this.state = {
	  showModal:false,
	  filterBooksBy:"",
	  search:this.props.bibleChapter? this.props.bibleChapter.reference:""
	};
  }

  render() {
    let next = { pathname:this.props.baseUrl, query: {} };
    let previous = { pathname:this.props.baseUrl, query: {} };

	const verseSelectorButtonStyle = {
	  border:'none', background:'transparent'
	};

  if(this.props.bibleChapter !== null ){
    if(this.props.bibleChapter.nextChapter !== undefined ){
      next = { pathname:this.props.baseUrl+this.props.bibleChapter.nextChapter.url, query: {} };
    }
    if(this.props.bibleChapter.previousChapter !== undefined ){
        previous = { pathname:this.props.baseUrl+this.props.bibleChapter.previousChapter.url, query: {} };
    }
  }

  if(this.props.baseUrl == "/"){
    next = { pathname:this.props.bibleChapter.nextChapter.url, query: {} };
    previous = { pathname:this.props.bibleChapter.previousChapter.url, query: {} };
  }

    return (<div id="biblenav">
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link className="previous" to={previous} >
				&lt;
			</Link>

			<Search term={this.state.search} changeHandler={this.searchChangeHandler.bind(this)} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

			<Link className="next" to={next} >
				&gt;
			</Link>

			<button  className="menu" onClick={this.toggleModal.bind(this)} >
			    &#x2637;
			</button>
		</div>
			<VerseSelector bible={this.props.bible} handleBooksFilter={this.handleBooksFilter.bind(this)} toggleModal={this.props.toggleModal} shouldDisplay={this.state.showModal} filterBooksBy={this.state.filterBooksBy} close={this.close.bind(this)}/>
		</div>
    )
  }

  searchChangeHandler(event) {
    event.preventDefault();
    this.setState({search:event.target.value});
  }

  bibleSearchSubmitHandler(event) {
  	event.preventDefault();
  	console.log('search submitted...');
  	let url = this.state.search.replace(/\W+/g, '_');
  	this.props.history.push("/bible/"+url.toLowerCase());
  }

  toggleModal() {
    console.log("toggle toggle ...");
    const show = !this.state.showModal;
    this.setState({showModal:show});
  }

  close(){
   const show = !this.state.showModal;
   this.setState({showModal:show, filterBooksBy: "" });
  }

  handleBooksFilter(event){
    this.setState({ filterBooksBy: event.target.value });
  }

}

Navigation.defaultProps = {};

export default Relay.createContainer(Navigation, {
  initialVariables: {
    courseSlug:""
},
  fragments: {
	bible: (variables) => Relay.QL`
	  fragment on Bible {
		 books(first:66){
		   edges {
			cursor
			node{
			title
		  	chapterCount
			}
		   }

		 }
		}`,
      bibleChapter: () => Relay.QL`fragment on BibleChapter {
      	nextChapter{url}
      	previousChapter{url}
      	reference
      }`,
  }
});
