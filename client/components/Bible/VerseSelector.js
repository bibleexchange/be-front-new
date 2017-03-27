import React from 'react';
import ModalComponent from '../App/ModalComponent';
import BibleBooksList from './BibleBooksList';

class VerseSelectorComponent extends React.Component {

  render() {
	                                                                                                                                                                                                        let bible = this.props.bible;

    return (
	    <div>
		  <h4>Choose a book and chapter to open</h4>
		  <input type='text' onChange={this.props.handleBooksFilter} placeholder='  filter'></input>
		  <BibleBooksList bible={bible} filterBy={this.props.filterBooksBy} closeAll={this.props.close} />
	</div>
    );
  }
}


export default class VerseSelector extends React.Component {
  render() {
    return (<ModalComponent
      close={this.props.close}
      shouldDisplay={this.props.shouldDisplay}
      component={<VerseSelectorComponent {...this.props} />}
    />);
  }

}
