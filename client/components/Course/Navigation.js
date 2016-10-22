import React from 'react'
import { Link } from "react-router"
import Relay from 'react-relay'
import LessonsList from './LessonsList'

class Navigation extends React.Component {
  componentWillMount(){
  	this.state = {
  	  showSelector:false
  	};

    localStorage.setItem('course-nav', "/course/"+this.props.course.id+"/lesson/"+this.props.lesson.id);

  }

  componentWillReceiveProps(newProps){
    if(newProps.course.id !== this.props.course.id || newProps.lesson.id !== this.props.lesson.id){
      localStorage.setItem('course-nav', "/course/"+newProps.course.id+"/lesson/"+newProps.lesson.id);
    }
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
    previousLink = <Link to={previousLessonUrl} className="btn btn-default" style={styles.previous} >&lt;</Link>;
  }
	if(nextLessonUrl){
    nextLink = 	<Link to={nextLessonUrl}  className="btn btn-default" style={styles.next}>&gt;</Link>;
  }

    return (<div>
		<div className="orangeBG" style={{marginBottom:'25p', textAlign:'center'}}>

      <h1><Link to={"/course/"+this.props.course.id}></Link></h1>

			{this.props.course.title}: Lesson #{this.props.lesson.order_by}

			<button onClick={this.toggleModal.bind(this)} style={selectorButtonStyle}>
			  &#x2637;
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
              steps(first:100){
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
