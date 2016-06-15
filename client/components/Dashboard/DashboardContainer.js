import Relay from 'react-relay';
import Dashboard from './DashboardComponent';

export default Relay.createContainer(Dashboard, {
	
	initialVariables: {
		chapterPageSize: 100,
		chapterCursor: null,
		stepPageSize: 100,
		coursePageSize:5,
		courseCursor: "",
		modulePageSize:100,
		moduleCursor:null,
		libraryFilter:''
	  }, 
	
   fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer  @relay(pattern: true){
    id
    auth {
      firstname
      username
      email
    }
    courses(first: 2, after:$courseCursor) {
      edges {
        cursor
        node {
          id
          title
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }	
  }`,
  course: () => Relay.QL`
   fragment on Course{
      id
      title
      description
      modules(first: 2) {
        edges {
          cursor
          node {
            id
            title
            order_by
            chapters(first: 1) {
              edges {
                cursor
                node {
                  id
                  title
                  order_by
                  steps(first: 1) {
                    edges {
                      node {
                        id
                        body
                        type
                      }
                    }
                    pageInfo{
                        hasNextPage
						hasPreviousPage
						startCursor
						endCursor
                    }
                  }
                }
              }
              pageInfo{
                hasNextPage
				hasPreviousPage
				startCursor
				endCursor
              }
            }
          }
        }
      }
  }`,
  }
});