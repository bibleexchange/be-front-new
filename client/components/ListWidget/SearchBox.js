import React from 'react';
import { Link } from 'react-router';
import Loading from './Loading.js'
import './SearchBox.scss'


class SearchBox extends React.Component {

  componentWillMount(){
    this.state = {
      filter: this.props.details.filter? this.props.details.filter:''
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.details.filter !== this.state.filter){
      let n = this.state
      n.filter = newProps.details.filter 
      this.setState(n)
    }
  }

  render() {

    let nextButtonText = 'Next'

    if(this.props.items !== undefined){
      nextButtonText = 'Page ' + this.props.details.currentPage + ' of ' + this.props.items.totalPagesCount;
    }

    let nextPageDisabled = true;
    let search = <Loading />
    let noItems = null

    if (this.props.items !== undefined && this.props.items.pageInfo.hasNextPage ) {
      nextPageDisabled = false;
    } else if (this.props.items !== undefined) {
    }

      let sentence = ''

      if(this.props.details.totalCount  === 1){
        sentence = this.props.details.totalCount  + " Matching " + this.props.details.title.singular;
      }else if(this.props.details.totalCount  !== null){
        sentence = this.props.details.totalCount  + " Matching " + this.props.details.title.plural;
      }

      if (this.props.status === null) {

        search = <input type='text' onKeyUp={this.runScriptOnPressEnterNoteSearch.bind(this)} onChange={this.handleEditFilter.bind(this)} onBlur={this.updateFilter.bind(this)} placeholder='  filter' value={this.state.filter} />
      }

      if (this.props.details.totalCount >= 1) {
          noItems = null;
      }else{
          noItems =  <div style={{ display: 'inline-block', height: '175px', lineHeight: '175px' }}><h2>{this.props.details.noResultsMessage}</h2></div>
      }

    return (

      <div id='search'>
         <h3 className='search-count'>{sentence}</h3>
         <Link to='' className='clearFilter' onClick={this.handleClearFilter.bind(this)} >&nbsp; &times; &nbsp;</Link>
         {search}
         <button disabled={nextPageDisabled} onClick={this.props.handleNextPage}>{nextButtonText}</button>

          {noItems}

       </div>
    )

  }

  handleEditFilter(e){
    e.preventDefault()
      let n = this.state
      n.filter = e.target.value

      this.setState(n)
  }

  handleClearFilter(e){
    e.preventDefault()
    let s = this.state
      s.filter = ""
      this.setState(s)

      this.props.handleUpdateFilter("")
  }

    runScriptOnPressEnterNoteSearch(e) {

        if (e.keyCode == 13) {
            console.log('enter key pressed!');
            this.props.handleUpdateFilter(this.state.filter);
        }
    }

    updateFilter(e){
        this.props.handleUpdateFilter(this.state.filter);
    }

}

export default SearchBox
