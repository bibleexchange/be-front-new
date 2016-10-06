import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';
import BibleWidget from '../Bible/WidgetComponent';

import './Index.scss';

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

let chaptersStyle = {
	display:"block"
};

if(!this.state.collapsed){
  chaptersStyle.display = "none";
}
 let listBreak = "";
if(this.props.book.n == "Matthew"){
  listBreak = <hr />;
}

	return (
		<div className="bookselect">
		{listBreak}
		  <a className="bookname" onClick={this.toggleChapter.bind(this)} href="#">
			<strong>{this.props.book.n}</strong>
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

    return (
		<div>
			{this.props.bible.books.edges.filter(function(el){return el.node.n.toLowerCase().includes(filterBy);}).map(function(book) {
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

		  <button onClick>Old Testament</button>
		  <button onClick>New Testament</button>
		  <button onClick>Random</button>

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
	  search:this.props.bibleChapter.reference? this.props.bibleChapter.reference:""
	};
  }

  render() {

	const styles = {
		btn:{border:'none', background:'transparent'},
		next:{border:'none', background:'transparent'},
		previous:{border:'none', background:'transparent'}
	};

	const verseSelectorButtonStyle = {
	  border:'none', background:'transparent'
	};

  let next = { pathname:this.props.baseUrl+this.props.bibleChapter.nextChapter.url, query: {} };
  let previous = { pathname:this.props.baseUrl+this.props.bibleChapter.previousChapter.url, query: {} };

  if(this.props.baseUrl == "/"){
    next = { pathname:this.props.bibleChapter.nextChapter.url, query: {} };
    previous = { pathname:this.props.bibleChapter.previousChapter.url, query: {} };
  }

    return (<div>
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link to={previous} style={styles.previous}>
				PREV
			</Link>

			<Search term={this.state.search} changeHandler={this.searchChangeHandler.bind(this)} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

			<Link to={next} style={styles.next}>
				NEXT
			</Link>

			<button onClick={this.toggleModal.bind(this)} style={verseSelectorButtonStyle}>
			    MENU
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


class Player extends React.Component {

  render() {
console.log(this.props.library);
    return (
    <div>
      <h1>{this.props.library}</h1>
    </div>
    )
  }

}

class LibraryItem extends React.Component {

  render() {

    return (
    <div>
      <center><h1>{this.props.library.title}</h1></center>

	{this.props.library.courses.edges.map(function(course){
		return <li key={course.node.title+course.node.id}><Link to={"/course/"+course.node.id}>{course.node.title}</Link></li>;
	})}

    </div>
    )
  }

}

class Index extends React.Component {

  render() {
    let libraries = [];

    if(this.props.viewer.libraries !== null && this.props.viewer.libraries !== undefined){
      libraries = this.props.viewer.libraries.edges;
    }

    let bibleChapter = {};
    let bibleVerse = {};

    if(this.props.viewer.bibleChapter !== null){
      bibleChapter = this.props.viewer.bibleChapter;
    }

    if(this.props.viewer.bibleVerse !== null){
      bibleVerse = this.props.viewer.bibleVerse;
    }


    return (
	      <div className="WidgetContainer" >

          <div className="Widget" >
      		    <BibleWidget history={this.props.history} baseUrl=""
                bible={this.props.viewer.bible}
                bibleChapter={bibleChapter}
                bibleVerse={bibleVerse}/>
      		</div>

          <div className="Widget">

          <Link to={"/notes"}>Notes Page</Link>

      		{libraries.map(function(library){
            if(library.node.courses.edges.length > 0){
        		  return (
        			<LibraryItem key={library.node.id} library={library.node}/>
        		);
            }
      		})}
          </div>
	      </div>
    )
  }

}

//Bible exchange: An User Interface for Bible Related Libraries

// Library: A Collection of Courses of Study
// 1. The Holy Bible
// 2. Deliverance Center

// Course: A Collection of Paths of Study
// 1. The Holy Bible -> ['Genesis','Exodus',...]
// 2. Deliverance Center -> ['Church History 101','Personal Evangelism',...]

// Course: A Collection of Lessons
// 1. The Holy Bible [0] -> Genesis -> ['Chapter 1','Chapter 2',...]
// 2. The Holy Bible [0] -> Church History 101 -> ['Introduction','Ephesus',...]

// Lesson: A Collection of Steps
// 1. The Holy Bible [0] -> Genesis -> Chapter 1 -> ['verse 1','verse 2',...]
// 2. The Holy Bible [0] -> Church History 101 -> Introduction -> ['Audio to Hear','Text to Read','Questions',...]

// Step: Steps Can be Cross Referenced with Other Steps (in other Libraries even).
// Properties: Properties will be a required text and 2 optional properties: link to image and OEMBED compliant url
// Steps Will be of a Singular Type of the Following:
///// 1. Text <STATIC: entirely processed on server>
///// 2. Test, Bible Verses List: <INTERACTIVE: data from server but processed on frontend>
///// 3. Oembed <API's: oembed url from server and get request made on frontend>

// Note/Comment: Community Created thought/discussion on a LIBRARY - PATH - COURSE - LESSON - STEP - or another COMMENT.
// Cross References can be voted up or down
// Linked to Persons Profile, text, image/video link, emoji or any combination of these.

Index.defaultProps = {};

export default Relay.createContainer(Index, {
  initialVariables: {
    pageNumber:"1",
    reference:"john_3_16"
},
  fragments: {
	viewer: () => Relay.QL`
	  fragment on Viewer {

	      	bibleChapter (reference:"john_3_16") {
	      	  ${BibleWidget.getFragment('bibleChapter')}
		     }
		      bibleVerse (reference:"john_3_16") {
			${BibleWidget.getFragment('bibleVerse')}
		   }

	      	bible {
	      	  ${BibleWidget.getFragment('bible')}
	      	}

		 libraries(first:10){
		       edges {
      			 cursor
      			 node {
      			   id
      			   title
      			   courses(first:10){
      			   edges {
      			    cursor
      			    node{
      				id
      				title
      			    }
      			   }
              }
      			 }
		       }
		     }
		}`
  }
});
