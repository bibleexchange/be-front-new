import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewerQuery }`,
  bibleChapter: () => Relay.QL`query { bibleChapterQuery(id:1) }`,
};