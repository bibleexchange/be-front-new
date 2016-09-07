/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';

//import './Course.scss';

class Step extends React.Component {

  render() {
const step = this.props.step;
const body = JSON.parse(step.body);
console.log(body);
    return (

	<div>
<li><input value={step.order_by} /></li>

{body.items.map(function(item){
  return <li>{item.type} {item.value}</li>;
})}

	<hr />
	
	</div>   

    );
  }

}

class CourseEditor extends React.Component {

  render() {
console.log(this.props.course.steps);
    return (
      <Page heading={''} >
	<div className="WidgetContainer">
        <div className="Widget">
<h1>		Title: <input value={this.props.course.title} /></h1>
<h2>{this.props.course.stepsCount} Steps</h2>
		{this.props.course.steps.edges.map(function(step){
		  return <Step key={step.id} step={step.node}/>;
		})}
 	</div> 
	
	</div>   
      </Page>
    );
  }

}

CourseEditor.defaultProps = {
	course:{
	  id:88,
	  title:"Study of Romans",
	  stepsCount:10,
	  steps: []
	}
};

CourseEditor.propTypes = {
  course: React.PropTypes.object.isRequired
};

export default Relay.createContainer(CourseEditor, {
  initialVariables: {
	courseId: 1
  }, 
  fragments: {
    viewer: () => Relay.QL`fragment on User {id}`, 
    course: (variables) => Relay.QL`
	fragment on Course {
		id
	        identifier
		title
		stepsCount
		steps(first:100){
		  pageInfo{hasNextPage hasPreviousPage}
		      edges {
			node {
			  id
			  order_by
			  body
			}
		      }
		    }	  
	}`,
 },
});

