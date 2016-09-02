import Relay from 'react-relay';
import Bible from './BibleComponent';

export default Relay.createContainer(Bible, {
  initialVariables: {
	bibleChapterId:5,
	libraryFilter:'',
	reference:'john_3_16'
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
		  url
		  reference
		}
      }
    `,
	bibleVerse: () => Relay.QL`
      fragment on BibleVerse {
		  id
		  v
		  t
		  reference
		  url
		  notes {
			id
			body
			user {
			  id
			  name
			}
		}
      }
    `,
  },
});