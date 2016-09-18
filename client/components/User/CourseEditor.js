/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
//import CourseUpdateMutation from './CourseUpdateMutation';

//import './Course.scss';

class MultipleChoice extends React.Component {

  render() {

    return (

	<div>
		{this.props.options.map(function(o,i){
			return <div><input name={"question"+parentKey} type="radio" key={i} value={o.correct} />{o.display}</div>;
		})}
	</div>

    );
  }

}

class QuoteVerses extends React.Component {

  render() {

    return (

	<div>
		{this.props.options.map(function(o,i){
			return <div>{o}</div>;
		})}
	</div>

    );
  }

}

class DownloadMarkdown extends React.Component {

  render() {

    return (

	<div dangerouslySetInnerHTML={this.createMarkup()}></div>

    );
  }

createMarkup(){
 return {__html: this.props.item.value};
}

}

class Quiz extends React.Component {

  render() {

    return (

	<div>
		<h1>{this.props.item.value.title}</h1>
		<p>{this.props.item.value.instructions}</p>
		{this.props.item.value.questions.map(function(q,i){
			return <Question q={q} key={i} parentKey={i}/>;
		})}
	</div>

    );
  }

}

class Question extends React.Component {

  render() {
	let component = '';

	switch(this.props.q.type){
	    case "mc":
		component = <MultipleChoice options={this.props.q.options} parentKey={this.props.parentKey}/>;
		break;
	    case 'bible/chapters':
		component = "Bible Chapters";
		break;
	    case "bible/memorize/verses":
		component = "Memorize Verses";
		break;
	    case "read/bible/verses":
		component = "Read Bible Verses";
		break;
	    case "subjective":
		component = "Subjective Question";
		break;
	    case "quote/verses":
		component = <QuoteVerses options={this.props.q.options}/>;;
		break;
	    default:
		component = "NOTHING MATCHES " + this.props.q.type;
	}

    return (

	<div>
		<h1>[{this.props.q.type}] {this.props.q.question}</h1>

		{component}

	</div>

    );
  }

}


class Step extends React.Component {

  render() {
const step = this.props.step;

    return (

	<div>
<li><input value={step.order_by} onChange={this.handleOrderChange} /></li>

{step.attachments.edges.map(function(item, i){
	let component = null;
	switch(item.node.type.classname){
	    case '\\BibleExperience\\Text':
		component = 'Text'//<DownloadMarkdown key={i} item={item} step={step}/>;
		break;
	    case '\\BibleExperience\\Test':
		component = 'Test';//<Quiz key={i} item={item} step={step} />;
		break;
	    case '\\BibleExperience\\BibleList':
		component = "Bible List";
		break;
	    case '\\BibleExperience\\BibleChapter':
		component = "Bible Chapters";
		break;
	    case '\\BibleExperience\\BibleVerse':
		component = "Bible Verses";
		break;
	    case '\\BibleExperience\\Note':
		component = "Note";
		break;
	    case '\\BibleExperience\\Link':
		component = "Link";
		break;
	    case '\\BibleExperience\\Recording':
		component = "Recording";
		break;
	    case '\\BibleExperience\\Image':
		component = "Image";
		break;
	    default:
		component = "NOTHING MATCHES " + item.node.type.classname;
	}


  	return <div key={i}><h2 style={{color:"red"}}>{item.node.type.classname}</h2>{component}<hr /></div>;
})}

	<hr />

	</div>

    );
  }

  handleOrderChange(e){
    console.log(e.target.value);
  }

}

class CourseEditor extends React.Component {

  componentWillMount(){
    this.state = {
	course:this.props.course,
	status: {title:'saved'}
	};
  }

  render() {

	var titleStyle = {};

	if(this.props.relay.hasOptimisticUpdate(this.props.course)){
	  titleStyle.color = 'red';
	}

    return (
      <Page heading={''} >
	<div className="WidgetContainer">
        <div className="Widget">
		<h1 style={titleStyle}>Title: <input value={this.state.course.title} onChange={this._handleEditTitle.bind(this)} onBlur={this._handleUpdateTitle.bind(this)}/>[{this.state.status.title}]</h1>
		<h2>{this.props.course.stepsCount} Steps</h2>

		{this.props.course.steps.edges.map(function(step){
		  return <Step key={step.node.id} step={step.node}/>;
		})}

 	</div>

	</div>
      </Page>
    );
  }

  _handleEditTitle(e){
    console.log('editing title', this.state.course.title);
    this.setState({
	course:{title:e.target.value},
	status: {title:'changes not saved'}
	});
  }

  _handleUpdateTitle(){
    console.log('off focuse save',this.state.course.title);
    this.setState({
	status: {title:'saving ...'}
	});
/*
    Relay.Store.commitUpdate(new CourseUpdateMutation({
	course:this.props.course,
	title: this.state.course.title
	}));
*/
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
 /*   viewer: () => Relay.QL`fragment on Viewer {
	user(token:$token){
	  id
	  authenticated
	}
        course(id:$courseId){
	   ${CourseUpdateMutation.getFragment('course')}
	  id
	  identifier
		title
		stepsCount
		steps{
		  id
		  order_by
		  attachments{
		    id
		    step_id
		    type {classname}
		    obj {
    		      notesCount
    		      id
    		      previousChapter {
    		        id
    		      }
	              user_id
		    }
		}
	}
  }`,*/

 },
});
