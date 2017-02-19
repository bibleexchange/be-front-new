import React from 'react';
import Relay from 'react-relay';
import NoteViewer from './NoteViewer';

import './NotePrintPage.scss';

class NotePrintPageComponent extends React.Component {

  componentDidMount(){
      window.print();setTimeout("window.close()", 8000);
  }

  render() {
    return (
              <div id="print-this-note"><NoteViewer note={this.props.viewer.notes.edges[0].node} viewer={this.props.viewer} /></div>
    )
  }
}

NotePrintPageComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NotePrintPageComponent, {
  initialVariables: {
  	noteId: "55555",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
          user {
            authenticated
          }
        ${NoteViewer.getFragment('viewer')}
        notes(first:1, id:$noteId){
          edges{
            node{
              ${NoteViewer.getFragment('note')}
            }
          }
        }
      }`,

    },
});
