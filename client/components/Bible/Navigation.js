import React from 'react'
import { Link } from "react-router"
import Relay from 'react-relay'
import VerseSelector from './VerseSelector'
import Search from './Search'
import './Navigation.scss'

class Navigation extends React.Component {

  componentWillMount(){
	this.state = {
	  showModal:false,
	  filterBooksBy:"",
	  search:this.props.bibleChapter? this.props.bibleChapter.reference:""
	}
  }

  componentWillReceiveProps(newProps){
    if(newProps.bibleChapter.reference !== this.props.bibleChapter.reference){
      this.setState({search:newProps.bibleChapter.reference})
    }
  }

  render() {
    let next = { pathname:this.props.baseUrl, query: {} }
    let previous = { pathname:this.props.baseUrl, query: {} }

	const verseSelectorButtonStyle = {
	  border:'none', background:'transparent'
	}

  if(this.props.bibleChapter !== null ){
    if(this.props.bibleChapter.nextChapter !== undefined ){
      next = { pathname:this.props.baseUrl+this.props.bibleChapter.nextChapter.url, query: {} }
    }
    if(this.props.bibleChapter.previousChapter !== undefined ){
        previous = { pathname:this.props.baseUrl+this.props.bibleChapter.previousChapter.url, query: {} }
    }
  }

  if(this.props.baseUrl == "/"){
    next = { pathname:this.props.bibleChapter.nextChapter.url, query: {} }
    previous = { pathname:this.props.bibleChapter.previousChapter.url, query: {} }
  }

    return (<div id="biblenav">
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link className="previous" to={previous} >
				&lt;
			</Link>

			<Search term={this.state.search} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

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

  bibleSearchSubmitHandler(term) {
  	console.log('search submitted...')
    this.setState({search:term})

  	let url = term.replace(/\W+/g, '_')
  	this.props.history.push("/bible/"+url.toLowerCase())
  }

  toggleModal() {
    console.log("toggle toggle ...")
    const show = !this.state.showModal
    this.setState({showModal:show})
  }

  close(){
   const show = !this.state.showModal
   this.setState({showModal:show, filterBooksBy: "" })
  }

  handleBooksFilter(event){
    this.setState({ filterBooksBy: event.target.value })
  }

}

Navigation.defaultProps = {}

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
})
