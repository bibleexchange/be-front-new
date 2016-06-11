import React from 'react';
import { Link } from "react-router";
import Search from './Search';
import NavigationExpanded from './NavigationExpanded';

class Navigation extends React.Component {
	
  render() {
	const styles = {
		btn:{border:'none', background:'transparent'},
		next:{border:'none', background:'transparent'},
		previous:{border:'none', background:'transparent'}
	};
	
    return (	
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link to={this.props.nextChapterUrl} className="btn btn-default" style={styles.previous}>
				<span className="glyphicon glyphicon-chevron-left"></span>
			</Link>

			<Search term={this.props.searchTerm} changeHandler={this.searchChangeHandler} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

			<Link to={this.props.previousChapterUrl}  className="btn btn-default" style={styles.next} onClick={this.props.getNextHandler}>
				<span className="glyphicon glyphicon-chevron-right"></span>
			</Link>
					
			<NavigationExpanded course={this.props.course}/>
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
	previousChapterUrl:'/'
};

Navigation.propTypes = {
    viewer: React.PropTypes.object.isRequired,
	course: React.PropTypes.object.isRequired,
  };
  
export default Navigation;