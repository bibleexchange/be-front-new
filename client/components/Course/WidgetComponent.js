/* eslint-disable global-require */
import React from 'react';
import BibleVerseFocus from './BibleVerseFocus';
import CourseNavigation from './Navigation';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

import './Course.scss';

class Step extends React.Component {

  render() {
	let step = this.props.node;
    return (
      <div>
		 		<p>{step.body} (<em>STEP TYPE: {step.type}</em>)</p>
      </div>
    );
  }
  
} 


class Chapter extends React.Component {
    
  render() {

    return (
      <div>
		 <h2>{this.props.node.title}</h2>
		<p>{this.props.node.description}</p>
		
		{this.props.node.steps.edges.map(function(step,index){
			return (<Step {...step} key={index}/>);
		})}
		
		<button onClick={function(){}}>Load more steps if available and then maybe acts to advance to next chapter</button>
		
      </div>
    );
  }
  
} 

class Module extends React.Component {

  render() {
	
    return (
      <div>
		 <h2>{this.props.title}</h2>
		<p>{this.props.description}</p>
		
		{this.props.node.chapters.edges.map(function(chap,index){
		return (<Chapter {...chap} key={index} />);
		})}

      </div>
    );
  }
  
} 

class WidgetComponent extends React.Component {

  render() {
    return (
      <div>
	  		<h2>Hey matt this is a Course Widget</h2>
				<CourseNavigation course={this.props.course} viewer={this.props.viewer} nextChapterUrl='/' searchTerm="Introduction" previousChapterUrl='/'/>
				{this.props.course.modules.edges.map(function(mod,index,nextStep) {
					return <Module {...mod} key={index} />
				})}
      </div>
    );
  }

 handleNextStep(){
	
	this.props.relay.setVariables({
		stepPageSize: this.props.relay.variables.stepPageSize+1
		});
	
	console.log(this.props.relay.variables.stepPageSize, this.props.relay.variables.stepPageSize+1);
	
  }
  
} 

WidgetComponent.propTypes = {
    viewer: React.PropTypes.object.isRequired,
	course: React.PropTypes.object.isRequired,
  };
  
export default WidgetComponent;