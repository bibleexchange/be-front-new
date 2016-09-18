/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import Navigation from './Navigation';
import BibleWidget from '../Bible/WidgetComponent';

import './Course.scss';

class Course extends React.Component {

  render() {

	let nexturl = '/course/'+this.props.course.currentStep.course_id+'/'+this.props.course.currentStep.nextStep.order_by;
	let previousurl = '/course/'+this.props.course.currentStep.course_id+'/'+this.props.course.currentStep.previousStep.order_by;

	const next = { pathname:nexturl, query: { ref: this.props.bibleChapter.nextChapter.referenceSlug } };
	const previous = { pathname:previousurl, query: { ref: this.props.bibleChapter.previousChapter.referenceSlug } };

    return (
      <Page heading={''} >
	<div className="WidgetContainer">
        <div className="Widget">
	  <Navigation course={this.props.course} nextStepUrl={next} previousStepUrl={previous}/>
	  <div style={{margin:"15px"}} dangerouslySetInnerHTML={this.createBodyCopy(this.props.course.currentStep.html)}></div> 
 	</div> 
	<div className="Widget">
	  <BibleWidget bible={this.props.bible} bibleChapter={this.props.bibleChapter} bibleVerse={null} baseUrl={"/course/"+this.props.course.identifier+"/"+this.props.course.currentStep.order_by}/>
	</div>
	</div>   
      </Page>
    );
  }
  
  createBodyCopy(markUp){
    return {__html:markUp};
  }

}

Course.defaultProps = {
	course:{
	  id:88,
	  title:"Study of Romans",
	  stepsCount:10,
	  steps: []
	},
  bible: {
	books: {
	  edges:[]
   }
},
  bibleChapter:{nextChapter:["1001","/bible/john_4"], previousChapter:["1001","/bible/john_4"], reference:"John 3", verseCount:5, verses:[]}
};

Course.propTypes = {
  course: React.PropTypes.object.isRequired,
  bible: React.PropTypes.object.isRequired,
  bibleChapter: React.PropTypes.object.isRequired,
  reference: React.PropTypes.string.isRequired
};
  
const pageSize = 1;

export default Relay.createContainer(Course, {
  initialVariables: {
	reference:"amos_1",
	courseId: 1,
	stepOrderBy:3,
	pageSize: pageSize,
	opaqueCursor: "opaqueCursor",
	courseSlug:""
  }, 
  fragments: {
/*    viewer: () => Relay.QL`
      fragment on User {id}`, 
    bible: (variables) => Relay.QL`
	fragment on Bible {
	  ${BibleWidget.getFragment('bible',variables)}	
    }`,
	bibleChapter: (variables) => Relay.QL`
      fragment on BibleChapter {
	${BibleWidget.getFragment('bibleChapter',variables)}		
		verseCount
		reference
		nextChapter{
		  referenceSlug
		}
		previousChapter{
		  referenceSlug
		}
		notes {
			id
			body
			user {
			  id
		      name
			}
		}
		verses {
		  id
		  v
		  t
		  url
		  reference
		}
      }`, 
	course: (variables) => Relay.QL`
	fragment on Course {
	  ${Navigation.getFragment('course',variables)}
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
			}
		      }
		    }
		currentStep( orderBy:$stepOrderBy) {
		  id
		  html
		  order_by
		  course_id
		  nextStep {order_by}
		  previousStep {order_by}
		}	  
	}`,*/
 },

});

