import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import BibleWidget from './WidgetComponent';
import './Bible.scss';

class Bible extends React.Component {

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

      componentWillReceiveProps(newProps) {
        //console.log(newProps)
      }

  render() {

    let crossReferences = []
    let bibleChapter = this.props.bibleChapter
    let reference = this.props.reference
    let user = this.props.user
    let handleSearchBibleReference = this.props.handleSearchBibleReference
    let verses = this.props.verses
    let handleMoreSearch = this.props.handleMoreSearch
    let bibles = []

    if(this.props.bibles !== undefined){
      bibles = this.props.bibles.edges
    }
    return (
		<div id='bible'>

        {bibles.map(function (bible) {
          return (<BibleWidget
            key={bible.node.id}
            bible={bible.node}
            bibleChapter={bibleChapter}
            user={user}
            reference={reference}
            handleSearchBibleReference={handleSearchBibleReference}
            verses={verses}
            handleMoreSearch={handleMoreSearch}
          />);
        })}

   </div>
    );
  }

}

Bible.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Bible.defaultProps = {
    bibleChapter: {
        verses: {
            edges: []
        },
        nextChapter: {},
        previousChapter: {}
    }
}

export default createFragmentContainer(Bible, {
    user: () => Relay.QL`fragment on User {
        ...BibleWidget_user

        id
        authenticated
    }`,
    bibles: () => Relay.QL`fragment on BibleConnection {

        pageInfo{
          hasNextPage
          hasPreviousPage
        }
        edges{
          cursor
          node{
            id
            ...BibleWidget_bible
          }
        }
    }`,
  bibleChapter: () => Relay.QL`fragment on BibleChapter {
                  ...BibleWidget_bibleChapter
                  id
                  url
                  reference
                        verses(first:20){
                          edges{
                            node{
                              id
                              order_by
                              body
                            }
                          }
                   }
              }`,

    verses: () => Relay.QL`fragment on BibleVerseConnection {
      ...BibleWidget_verses
   }`,


});
