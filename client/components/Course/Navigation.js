import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';

class Note extends React.Component {
  render() {
	return (<Link to={this.props.baseUrl+"/note/"+this.props.lessonnote.id} onClick={this.props.closeAll}>{this.props.lessonnote.order_by}</Link>)}
}

class Lesson extends React.Component {
  render() {
    const closeAll = this.props.closeAll;
    const baseUrl = this.props.baseUrl;

	return (<ul>{this.props.lesson.title}
    {this.props.lesson.notes.edges.map(function(lessonnote){
      return <li key={lessonnote.node.id}><Note lessonnote={lessonnote.node} closeAll={closeAll} baseUrl={baseUrl}/></li>;
    })}
    </ul>);
  }
}



class LessonsList extends React.Component {

  render() {
  let baseUrl = this.props.baseUrl;
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
			{this.props.course.lessons.edges.map(function(lesson) {
          return <li key={lesson.node.id}><Lesson lesson={lesson.node} closeAll={closeAll} baseUrl={baseUrl+"/lesson/"+lesson.node.id}/></li>;
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
  let previousLink = null;
  let nextLink = null;

  const baseUrl = "/course/"+this.props.course.id;

	const styles = {
		btn:{border:'none', background:'transparent'}
	};

	const selectorButtonStyle = {
	  border:'none', background:'transparent'
	};

	if(this.props.previousStepUrl){
    previousLink = <Link to={this.props.previousStepUrl} className="btn btn-default" style={styles.previous}>PREVIOUS</Link>;
  }
	if(this.props.nextStepUrl){
    nextLink = 	<Link to={this.props.nextStepUrl? this.props.nextStepUrl:"#"}  className="btn btn-default" style={styles.next} onClick={this.props.getNextHandler}>NEXT</Link>;
  }

    return (<div>
		<div className="orangeBG" style={{marginBottom:'25p', textAlign:'center'}}>

      {previousLink}

			{this.props.course.title}: Lesson #{this.props.lesson.order_by}

      {nextLink}

			<button onClick={this.toggleModal.bind(this)} style={selectorButtonStyle}>
			  MENU
			</button>
		</div>
			<LessonsList baseUrl={baseUrl} shouldDisplay={this.state.showSelector} course={this.props.course} close={this.close.bind(this)} toggleModal={this.toggleModal.bind(this)}/>
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

export default Relay.createContainer(Navigation, {
  initialVariables: {
    stepOrderBy:"1"
},
  preparedVariables({stepOrderBy}){
    return { stepOrderBy: stepOrderBy+1};
  },
  fragments: {
	course: (variables) => Relay.QL`
	  fragment on Course {
    id
		title
		lessonsCount
		lessons(first:100){
		  pageInfo{hasNextPage, hasPreviousPage}
		      edges {
      			node {
      			  id
      			  order_by
      			  summary
              title
              notes(first:100){
                edges{
                  cursor
                  node{
                    id
                    order_by
                    next {
                      id
                    }
                    previous {
                      id
                    }
                    note {
                      output {
                        id
                        type
                        api_request
                        body
                      }
                    }

                  }
                }
              }
      			}
		      }
		    }
  }`,
  lesson: () => Relay.QL`
	  fragment on Lesson {
      id
      title
      summary
      order_by
      next {
        id
        order_by
      }
      previous {
        id
        order_by
      }
		}`
  }
});
