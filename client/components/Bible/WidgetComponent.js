import React from 'react';
import Relay from 'react-relay';
import BibleVerse from './BibleVerse';
import BibleNavigation from './Navigation';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6

class Search extends React.Component {

  componentWillMount(){
    this.state = {
      currentPage : this.props.verses.currentPage
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
  }

  render() {

    let next = null
    let totalPages = Math.ceil(this.props.verses.totalCount/this.props.verses.perPage)

    if(this.props.verses.pageInfo.hasNextPage){
      next = <button onClick={this.moreSearch.bind(this)} style={{width:"100%", border:"none", backgroundColor:"#00c97c", height:"45px", color:"white", fontWeight:"bold", fontSize:"1.5rem"}}>page {this.state.currentPage} of {totalPages}  &#8631;</button>
    }

    console.log(atob(this.props.verses.pageInfo.endCursor))

    return (<div>
          <ul>
          {this.props.verses.edges.map(function(verse){
            return <li key={verse.node.id} style={{padding:"15px"}}>

              <Link activeClassName="active-verse" to={!verse.node.url ? '' : verse.node.url} >
                <sup>{verse.node.reference}</sup>
              </Link>
                 &nbsp; {verse.node.body}
            </li>
          })}
          </ul>
          {next}
          </div>
    );
  }

  moreSearch(e){
    let s = this.state
    s.currentPage = s.currentPage+1
    this.setState(s)
    this.props.handleMoreSearch(e)
  }

}

class WidgetComponent extends React.Component {

  render() {

    let nextChapterUrl = null
    let goToNext = null
    let search = null

      if (this.props.bibleChapter !== null && this.props.bibleChapter.nextChapter !== null) {
          nextChapterUrl = this.props.bibleChapter.nextChapter.url;
          goToNext = <Link className='nextChapter' to={nextChapterUrl} >next chapter &#8631;</Link>;
      }else{
        if(this.props.verses !== null && this.props.verses !== undefined){
           search = <Search handleMoreSearch={this.props.handleMoreSearch} verses={this.props.verses}/>
       }
      }

    const transitionOptions = {
      transitionName: "bibley",
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnter: true,
      transitionEnterTimeout: 500,
      transitionLeave: true,
      transitionLeaveTimeout: 500
    }

    return (
      <div>
      	<BibleNavigation bible={this.props.bible} bibleChapter={this.props.bibleChapter} reference={this.props.reference} handleSearchBibleReference={this.props.handleSearchBibleReference} />
          <ul className="list-group">
           <CSSTransitionGroup {...transitionOptions} >
        	  {this.renderVerses()}
            </CSSTransitionGroup>
            </ul>
          {goToNext}

          {search}

      </div>
    );
  }

  renderVerses(){
    let user = this.props.user
    let clickVerseBody = this.props.clickVerseBody
    const baseUrl = ''
    let verses = []

    if(this.props.bibleChapter !== null){
      verses = this.props.bibleChapter.verses.edges
    }
    return verses.map(function (verse) {
              return <li className="list-group-item" key={verse.node.id} ><BibleVerse user={user} clickVerseBody={clickVerseBody} bibleVerse={verse.node} baseUrl={baseUrl} /></li>;
            })
  }

}

WidgetComponent.propTypes = {
  bibleChapter: React.PropTypes.object,
  bible: React.PropTypes.object,
};

export default Relay.createContainer(WidgetComponent, {
  fragments: {
    bibleChapter: () => Relay.QL`fragment on BibleChapter {
     ${BibleNavigation.getFragment('bibleChapter')}
      nextChapter{url}
      previousChapter{url}
		verses (first:200){
		  edges {
		    cursor
		    node{
		      id
           order_by
           body
           url
           notesCount
		     }
		  }
		}

      }`,
    bible: () => Relay.QL`fragment on Bible {
     ${BibleNavigation.getFragment('bible')}
   }`,

    user: () => Relay.QL`fragment on User {
        authenticated
   }`,

   verses: () => Relay.QL`fragment on BibleVerseConnection {
         pageInfo{
           hasNextPage
           endCursor
         }
         totalCount
         perPage
         currentPage
         edges{
           node {
             id
             body
             url
             reference
           }
         }
  }`,


  },
});
