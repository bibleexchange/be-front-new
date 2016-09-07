import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';

class Step extends React.Component {
  render() {
	return (<Link to={this.props.step.url} onClick={this.props.closeAll}>{this.props.step.order_by}</Link>)}
}

class StepsList extends React.Component {
  
  render() {

	const modalStyle = {
	  position: 'fixed',
	  top: 0, bottom: 0, left: 0, right: 0,
	  verticalAlign: 'middle',
	  position: 'fixed',
	  top: 0, bottom: 0, left: 0, right: 0,
	  zIndex: '1000',
	  backgroundColor: 'rgba(0,0,0,0.5)',
	  width:"100%"
	};

	if(!this.props.shouldDisplay){
	 modalStyle.display = 'none';
	}

	const dialogStyle = {
	  position: 'relative',
	  border: '1px solid #e5e5e5',
	  backgroundColor: 'white',
	  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
	  padding: 20,
	  zIndex:1050,
	  marginLeft:"10%",
	  marginRight:"10%",
	  marginTop:"70px"
	};
	
	const closeAll = this.props.close;

    return (<div style={modalStyle}>
		  <div style={dialogStyle} >
			
			<button onClick={this.props.toggleModal}>
			  <span>&times;</span>
			</button>
			
			<h4>Choose a Step</h4>
			
			<ul>
			{this.props.course.steps.edges.map(function(step) {
			  return <li key={step.node.id}><Step step={step.node} closeAll={closeAll} /></li>;
			 })}
			</ul>
		
		    </div>
		</div>)
  }

}

class Navigation extends React.Component {
  componentWillMount(){
	this.state = {
	  showSelector:false
	};
  }

  render() {
	const styles = {
		btn:{border:'none', background:'transparent'},
		next:{border:'none', background:'transparent'},
		previous:{border:'none', background:'transparent'}
	};
	
	const selectorButtonStyle = {
	  border:'none', background:'transparent'
	};
console.log(this.props);
	if(!this.props.course.currentStep.previousStep.order_by === null){styles.previous.display = "none";}	
	if(!this.props.course.currentStep.nextStep.order_by === null){styles.next.display = "none";}

    return (<div>	
		<div className="greenBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link to={this.props.previousStepUrl} className="btn btn-default" style={styles.previous}>
				<span className="glyphicon glyphicon-chevron-left"></span>
			</Link>

			{this.props.course.title}: Step #{this.props.course.currentStep.order_by}

			<Link to={this.props.nextStepUrl}  className="btn btn-default" style={styles.next} onClick={this.props.getNextHandler}>
				<span className="glyphicon glyphicon-chevron-right"></span>
			</Link>
			
			<button onClick={this.toggleModal.bind(this)} style={selectorButtonStyle}>
			  <span className="glyphicon glyphicon-th"></span>
			</button>
		</div>
			<StepsList shouldDisplay={this.state.showSelector} course={this.props.course} close={this.close.bind(this)} toggleModal={this.toggleModal.bind(this)}/>
	    </div>
    )
  }
  
  toggleModal() {
    const show = !this.state.showSelector;
    this.setState({showSelector:show});
  }
  
  close(){
   const show = !this.state.showSelector;
   this.setState({showSelector:show});
  }
	
}

Navigation.defaultProps = {};

export default Relay.createContainer(Navigation, {
  initialVariables: {
    stepOrderBy:1	
}, 
  preparedVariables({stepOrderBy}){
    return { stepOrderBy: stepOrderBy+1};
  },
  fragments: {
	course: (variables) => Relay.QL`
	  fragment on Course {
		title
		stepsCount
		steps(first:100){
		  pageInfo{hasNextPage hasPreviousPage}
		      edges {
			node {
			  id
			  order_by
			  url
			}
		      }
		    }
		currentStep(orderBy:$stepOrderBy) {
		  id
		  html
		  order_by
		  course_id
		  nextStep {order_by}
		  previousStep {order_by}
		  url
		}	  
				  
		}`
  }
});
