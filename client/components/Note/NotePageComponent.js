import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteViewer from './NoteViewer';

class NotePageComponent extends React.Component {

        render() {

      let viewer = null

      if(this.props.note === undefined){
          viewer = null
      }else{
          viewer =  <NoteViewer note={this.props.note} user={this.props.user} /> 
      }


    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                {viewer}
              </div>
       	</div>
    );
  }

}

NotePageComponent.propTypes = {
    user: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NotePageComponent, {
    fragments: {
        user: () => Relay.QL`
          fragment on User {
              ${NoteViewer.getFragment('user')}
              authenticated
      }`,

        note: () => Relay.QL`
          fragment on Note {
            id
            ${NoteViewer.getFragment('note')}

        }`,

    },
});