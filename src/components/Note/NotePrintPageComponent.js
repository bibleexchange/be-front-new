import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import NoteViewer from './NoteViewer';

import './NotePrintPage.scss';

class NotePrintPageComponent extends React.Component {

  componentDidUpdate() {
    console.log('printing...')
    window.print();
  }

  render() {

    let viewer = null

    if(this.props.note !== null && this.props.note !== undefined){
      viewer = <NoteViewer note={this.props.note} user={this.props.user} />      
    }

    return (
              <div id='print'>{viewer}</div>
    );
  }
}

NotePrintPageComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(NotePrintPageComponent, {
  user: () => Relay.QL`fragment on User {
          ...NoteViewer_user
          authenticated
          }`,

  note: () => Relay.QL`fragment on Note {
          ...NoteViewer_note
  }`,

});
