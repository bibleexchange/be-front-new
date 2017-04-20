import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteViewer from './NoteViewer';
import NoteOptions from './NoteOptions';

class NotePageComponent extends React.Component {

    componentWillMount() {

        if(this.props.params.notedId !== undefined && this.props.params.notedId !== null){
            console.log(this.props.params.noteId)
            this.handleViewThisNote(this.props.params.noteId)
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.params.notedId !== this.props.params.noteId && newProps.params.noteId !== undefined && newProps.params.noteId !== null) {
            console.log(newProps.params)
            this.handleViewThisNote(newProps.params.noteId)
        }

    }

        render() {

      let options = null
      let viewer = null

      if(this.props.viewer.note === undefined){
          options = null
          viewer = null
      }else{
          options = <NoteOptions note={this.props.viewer.note} user={this.props.viewer.user} editThisNote={this.props.handleEditThisNote}/>
          viewer =  <NoteViewer note={this.props.viewer.note} user={this.props.viewer.user} />
      }

    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                {options} {viewer}
              </div>
       	</div>
    );
  }

    handleViewThisNote(noteId){
        console.log(noteId)
        this.props.relay.setVariables({
            noteId: noteId
        });
    }
}

NotePageComponent.propTypes = {
    viewer: React.PropTypes.object.isRequired
};

export default Relay.createContainer(NotePageComponent, {
    initialVariables: {
        noteId: undefined,
    },
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
           user {
                ${NoteViewer.getFragment('user')}
                ${NoteOptions.getFragment('user')}
              authenticated
          }

        note(id:$noteId){
        id
        ${NoteViewer.getFragment('note')}
        ${NoteOptions.getFragment('note')}

        }

      }
    `,
    },
});