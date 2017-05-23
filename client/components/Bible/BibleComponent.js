import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
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
    return (
		<div id='bible'>

        {this.props.bibles.edges.map(function (bible) {
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

export default Relay.createContainer(Bible, {
  fragments: {
      user: () => Relay.QL`fragment on User {
          ${BibleWidget.getFragment('user')}

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
              ${BibleWidget.getFragment('bible')}
            }
          }
      }`,
    bibleChapter: () => Relay.QL`fragment on BibleChapter {
                    ${BibleWidget.getFragment('bibleChapter')}
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
        ${BibleWidget.getFragment('verses')}
     }`,


  },
});
