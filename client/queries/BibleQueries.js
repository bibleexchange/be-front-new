import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewerQuery }`,
  bibleChapter: (Component, variables) => Relay.QL`query {bibleChapterQuery(reference: $reference) {${Component.getFragment('bibleChapter', variables)}}}`,
  bibleVerse: () => Relay.QL`query { bibleVerseQuery(reference:$reference) }`,
  bible: () => Relay.QL`query { bibleQuery }`,
};
