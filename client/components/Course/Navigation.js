import React from 'react';
import { Link } from "react-router";
import Relay from 'react-relay';

class Lesson extends React.Component {
  render() {
	   return (<Link to={this.props.baseUrl} onClick={this.props.closeAll}>{this.props.lesson.title}</Link>);
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

			<h4>Choose a Lesson</h4>

			{this.props.course.lessons.edges.map(function(lesson) {
          return <h2 key={lesson.node.id}><Lesson lesson={lesson.node} closeAll={closeAll} baseUrl={baseUrl+"/lesson/"+lesson.node.id}/></h2>;
			})}

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
    	  let nextLessonUrl = false;
        let previousLessonUrl = false;

        if(this.props.lesson.next !== null){
          	nextLessonUrl = { pathname:'/course/'+this.props.course.id+'/lesson/'+this.props.lesson.next.id};
        }
        if(this.props.lesson.previous !== null){
            previousLessonUrl = { pathname:'/course/'+this.props.course.id+'/lesson/'+this.props.lesson.previous.id};
        }

  let previousLink = null;
  let nextLink = null;

  const baseUrl = "/course/"+this.props.course.id;

	const styles = {
		btn:{border:'none', background:'transparent'}
	};

	const selectorButtonStyle = {
	  border:'none', background:'transparent'
	};

	if(previousLessonUrl){
    previousLink = <Link to={previousLessonUrl} className="btn btn-default" style={styles.previous} >PREVIOUS</Link>;
  }
	if(nextLessonUrl){
    nextLink = 	<Link to={nextLessonUrl}  className="btn btn-default" style={styles.next}>NEXT</Link>;
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
