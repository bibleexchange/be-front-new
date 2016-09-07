import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewerQuery }`,
  bible: () => Relay.QL`query { bibleQuery }`,
  bibleChapter: (Component) => Relay.QL`
	  query {
		bibleChapterQuery(reference: $reference) {
		  ${Component.getFragment('bibleChapter')}
		}
	  }`,
  course: (Component, variables) => Relay.QL`
	  query {
		courseQuery(id: $courseId) {
		  ${Component.getFragment('course',variables)}
		}
	  }`,
};
