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
	//id, firstName, lastName, username, createdAt, updatedAt, middleName, suffix, twitter, profileImage, gender, email, password, confirmationCode, confirmed, active
    viewer: () => Relay.QL`
    fragment on User {
		id
		firstName
		username
		email
  }`,
  store: () => Relay.QL`
    fragment on Store {
		courses(first:$storePageSize, filter:$libraryFilter) {
		  edges {
			node {
			  id
			  title
			}
		  }
		  pageInfo{
			  hasPreviousPage, hasNextPage
		  }
		}
		course(id:$courseId){
		  id
		  title
		  url
		  description
		  modules(first:$modulePageSize, after:$moduleCursor){
			edges {
			  cursor
			  node {
				id
				title
				orderBy
				chapters (first:$chapterPageSize, after:$chapterCursor){
				  edges {
					cursor
					node {
					  id
					  title
					  orderBy
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
	}`
  }
});
