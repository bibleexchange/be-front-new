import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewerQuery }`,
  bibleChapter: (Component, variables) => Relay.QL`
	  query {
		bibleChapterQuery(reference: $ref) {
		  ${Component.getFragment('bibleChapter', variables)}
		}
	  }`,
  bibleVerse: () => Relay.QL`query { bibleVerseQuery(reference:$ref) }`,
  bible: () => Relay.QL`query { bibleQuery }`,
};
