import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import LessonsList from './LessonsList';

import './Navigation.scss';

class Navigation extends React.Component {
  componentWillMount() {
  	                                                                                                    this.state = {
  	                                                                                                      showSelector: false
  	};

  //  localStorage.setItem('course-nav', "/course/"+this.props.course.id+"/lesson/"+this.props.lesson.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.course.id !== this.props.course.id) {
      // localStorage.setItem('course-nav', "/course/"+newProps.course.id+"/lesson/"+newProps.lesson.id);
    }
  }

  render() {
    let previousLink = '';
    let nextLink = <i>Next</i>;

    const styles = {
      		   btn: { border: 'none', background: 'transparent' }
    };

    const selectorButtonStyle = {
      	     border: 'none', background: 'transparent'
    };

    if (this.props.nextAndPrevious.previous !== false) {
      previousLink = <Link style={styles.previous} to={this.props.baseUrl + '/' + this.props.nextAndPrevious.previous.section + '/' + this.props.nextAndPrevious.previous.step}><b>&lt;</b> Back</Link>;
    }
    if (this.props.nextAndPrevious.next !== false) {
      nextLink = 	<Link style={styles.next} to={this.props.baseUrl + '/' + this.props.nextAndPrevious.next.section + '/' + this.props.nextAndPrevious.next.step}>Next <b>&gt;</b></Link>;
    }

    return (<div>
		<div className='orangeBG' style={{ marginBottom: '25p', textAlign: 'center' }}>

      {this.props.course.title} > Sec. {this.props.section} {'"' + this.props.course.sections[this.props.section - 1].title + '"'} > Lesson: {this.props.step}

      <ul id='buttons-nav'>
        <li id={"back"+previousLink}>{previousLink}</li>
        <li>			<button onClick={this.toggleModal.bind(this)} style={selectorButtonStyle}>
        			  &#x2637; Menu
        			</button></li>
        <li>{nextLink}</li>
      </ul>

		</div>
			<LessonsList baseUrl={this.props.baseUrl} shouldDisplay={this.state.showSelector} course={this.props.course} close={this.close.bind(this)} toggleModal={this.toggleModal.bind(this)} />
	    </div>
    );
  }

  toggleModal() {
    const show = !this.state.showSelector;
    this.setState({ showSelector: show });
  }

  close() {
    const show = !this.state.showSelector;
    this.setState({ showSelector: show });
  }

}

export default Relay.createContainer(Navigation, {
  fragments: {}
});
