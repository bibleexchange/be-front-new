import React from 'react'
import { Link } from "react-router"
import Relay from 'react-relay'
import LibraryComponent from './LibraryComponent'
import './Index.scss'

class Index extends React.Component {

  render() {
    let libraries = []
    let continueHere = null

    if(this.props.viewer.libraries !== null && this.props.viewer.libraries !== undefined){
      libraries = this.props.viewer.libraries.edges
    }
    let nav = localStorage.getItem('course-nav')

    if(nav !== null){
      continueHere = <div className="orangeBG" style={{textAlign: "center", color:"white"}} id="continue"><Link to={nav}>Continue? </Link></div>
    }

    return (
	      <div className="WidgetContainer" >
          <div className="Widget">

          {continueHere}

          <div id="libraries">
        		{libraries.map(function(library){
              if(library.node.courses.edges.length > 0){
          		  return (
          			<LibraryComponent key={library.node.id} library={library.node}/>
          		)
              }
        		})}
          </div>
          </div>
	      </div>
    )
  }

}

Index.defaultProps = {}

export default Relay.createContainer(Index, {
  initialVariables: {
    pageNumber:"1",
    reference:"john_3_16"
},
  fragments: {
	viewer: () => Relay.QL`
	  fragment on Viewer {
      user {
        authenticated
      }
		 libraries(first:10){
		       edges {
      			 cursor
      			 node {
      			   id
      			   title
      			   courses(first:50){
      			   edges {
      			    cursor
      			    node{
      				id
      				title
      			    }
      			   }
              }
      			 }
		       }
		     }
		}`
  }
})
