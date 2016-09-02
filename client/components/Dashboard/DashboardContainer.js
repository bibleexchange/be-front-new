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
	bibleChapter: () => Relay.QL`
      fragment on BibleChapter {
		verseCount
		reference
		nextChapter
		previousChapter
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
		}
      }
    `,
  },
});