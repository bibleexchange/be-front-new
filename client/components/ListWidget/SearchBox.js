import React from 'react';
import { Link } from 'react-router';
import Loading from './Loading.js'
import './SearchBox.scss'


class SearchBox extends React.Component {

  render() {

    let nextButtonText = '_ of _';
    let nextPageDisabled = true;
    let filter = ''
    let search = <Loading />

    if(this.props.details.filter !== null){
      filter = this.props.details.filter
    }

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
        search = <input type='text' onKeyUp={this.props.runScriptOnPressEnter} onChange={this.props.handleEditFilter} onBlur={this.props.applyFilter} placeholder='  filter' value={filter} />
      }

    return (

      <div id='search'>
         <h3 className='search-count'>{sentence}</h3>
         <Link to='' className='clearFilter' onClick={this.props.handleClearFilter} >&nbsp; &times; &nbsp;</Link>
         {search}
         <button disabled={nextPageDisabled} onClick={this.props.handleNextPage}>{nextButtonText}</button>
       </div>



    )

  }

}

export default SearchBox
