import Relay from 'react-relay';
import Dashboard from './DashboardComponent';


export default Relay.createContainer(Dashboard, {
  initialVariables: {
	bibleChapterId:5,
	libraryFilter:''
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
		name
		email
		authenticated
      }
    `,
  },
});

/*
export default Relay.createContainer(Dashboard, {

  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer{
		id
		auth {
		  id
		  email
		  name
		}
		bibleChapter {
		  id
		  verses {
			t
		  }
		  notes {
			body
		  }
		}
		bible {
		  abbreviation
		  language
		  books {
			edges {
			  node {
				n
				chapterCount
			  }
			}
		  }
		}
	}
  `
}});
*/