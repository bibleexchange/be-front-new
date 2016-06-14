import Relay from 'react-relay';
import Dashboard from './DashboardComponent';

export default Relay.createContainer(Dashboard, {
	
	initialVariables: {
		chapterPageSize: 100,
		chapterCursor: null,
		stepPageSize: 100,
		storePageSize:5,
		modulePageSize:100,
		moduleCursor:null,
		courseId:1,
		libraryFilter:''
	  }, 
	
   fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
		id
		auth {
		  firstname
		  username
		  email
		}
		
		courses(first:$storePageSize) {
		  edges {
			node {
			  id
			  title
			}
		  }
		  pageInfo{
			  hasPreviousPage
			  hasNextPage
		  }
		}
		
		course{
		  id
		  title
		  description
		  modules(first:$modulePageSize, after:$moduleCursor){
			edges {
			  cursor
			  node {
				id
				title
				order_by
				chapters (first:$chapterPageSize, after:$chapterCursor){
				  edges {
					cursor
					node {
					  id
					  title
					  order_by
					  steps(first:$stepPageSize){
						edges {
						  node {
							id
							body
                            type
						  }
						}
						pageInfo {
							hasNextPage
							hasPreviousPage
						  }
					  }
					}
				  }
				pageInfo {
					hasNextPage
					hasPreviousPage
				  }
				}
			  }
			}
		  }
		}
  }`,
  }
});