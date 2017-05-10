import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import VerseSelector from './VerseSelector';
import Search from './Search';
import './Navigation.scss';

class Navigation extends React.Component {

    componentWillMount() {
        this.state = {
            showModal: false,
            filterBooksBy: '',
            search: this.props.reference
        };
    }

    componentWillReceiveProps(newProps) {
        if(newProps.reference !== this.props.reference){
            let n = this.state
            n.search = newProps.reference
            this.setState(n)
        }
    }

    render() {

        return (<div id='biblenav' className='blueBG'>
                    <Link className='previous' to={this.props.bibleChapter.previousChapter.url}>&lt;</Link>

                    <Search term={this.state.search} submitHandler={this.props.handleSearchBibleReference}/>

                    <Link className='next' to={this.props.bibleChapter.nextChapter.url}>
                        &gt;
                    </Link>

                    <button className='menu' onClick={this.toggleModal.bind(this)}>
                        &#x2637;
                    </button>

                <VerseSelector
                    bible={this.props.bible}
                    handleBooksFilter={this.handleBooksFilter.bind(this)}
                    toggleModal={this.props.toggleModal}
                    shouldDisplay={this.state.showModal}
                    filterBooksBy={this.state.filterBooksBy}
                    close={this.close.bind(this)}/>
            </div>
        );
    }

    toggleModal() {
        console.log('toggle toggle ...');
        const show = !this.state.showModal;
        this.setState({ showModal: show });
    }

    close() {
        const show = !this.state.showModal;
        this.setState({ showModal: show, filterBooksBy: '' });
    }

    handleBooksFilter(event) {
        this.setState({ filterBooksBy: event.target.value });
    }

}

export default Relay.createContainer(Navigation, {
fragments: {
bible: () => Relay.QL`
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
