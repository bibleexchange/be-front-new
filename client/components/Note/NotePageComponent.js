import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import NoteViewer from './NoteViewer';

class NotePageComponent extends React.Component {

  render() {
console.log();
    return (
			<Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
                <NoteViewer note={this.props.viewer.note} />
              </div>
       	</div>
      </Page>
    )
  }
}

NotePageComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NotePageComponent, {
  initialVariables: {
  	noteId: "55555",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        note (id:$noteId){
          ${NoteViewer.getFragment('note')}
      	}
      }`,
    },
});
