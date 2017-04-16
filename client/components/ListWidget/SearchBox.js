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

  render() {

    let nextButtonText = '_ of _';
    let nextPageDisabled = true;
    let search = <Loading />

    if (this.props.items !== undefined && this.props.items.pageInfo.hasNextPage ) {
      nextPageDisabled = false;
      nextButtonText = 'Next';
    } else if (this.props.items !== undefined) {
      nextButtonText = 'Next';
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

    return (

      <div id='search'>
         <h3 className='search-count'>{sentence}</h3>
         <Link to='' className='clearFilter' onClick={this.handleClearFilter.bind(this)} >&nbsp; &times; &nbsp;</Link>
         {search}
         <button disabled={nextPageDisabled} onClick={this.props.handleNextPage}>{nextButtonText}</button>
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
    let s = this.state
      s.filter = ""
      this.setState(s)

      this.props.handleClearFilter(e)
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
