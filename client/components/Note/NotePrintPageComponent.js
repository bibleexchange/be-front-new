import React from 'react';
import Relay from 'react-relay';
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

export default Relay.createContainer(NotePrintPageComponent, {
  fragments: {
    user: () => Relay.QL`fragment on User {
            ${NoteViewer.getFragment('user')}
            authenticated
            }`,

    note: () => Relay.QL`fragment on Note {
            ${NoteViewer.getFragment('note')}
    }`,

  },
});
