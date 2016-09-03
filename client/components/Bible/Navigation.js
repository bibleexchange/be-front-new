import React from 'react';
import { Link } from "react-router";
import Search from './Search';
import VerseSelector from './VerseSelector';

class Navigation extends React.Component {
	
  render() {
	const styles = {
		btn:{border:'none', background:'transparent'},
		next:{border:'none', background:'transparent'},
		previous:{border:'none', background:'transparent'}
	};
	
    return (	
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link to={this.props.previousChapterUrl} className="btn btn-default" style={styles.previous}>
				<span className="glyphicon glyphicon-chevron-left"></span>
			</Link>

			<Search term={this.props.searchTerm} changeHandler={this.searchChangeHandler} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

			<Link to={this.props.nextChapterUrl}  className="btn btn-default" style={styles.next} onClick={this.props.getNextHandler}>
				<span className="glyphicon glyphicon-chevron-right"></span>
			</Link>
					
			<VerseSelector bible={this.props.bible}/>
		</div>
    )
  }
  
	searchChangeHandler(event) {
		event.preventDefault();
	  }
	
	bibleSearchSubmitHandler(event) {
		event.preventDefault();
		console.log('search submitted...');
	}
	
}

Navigation.defaultProps = {
	nextChapterUrl:'/',
	searchTerm:'Genesis 1',
	previousChapterUrl:'/',
	bible:[
		{id:1,n:'Zoo4rt',chapters:32, slug:'zoo4rt'},
		{id:2,n:'Qoo4rt',chapters:4, slug:'qoort'}
	]
};

export default Navigation;
