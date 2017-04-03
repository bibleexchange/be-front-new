import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
//import SoundCloudPlayer from './SoundCloudPlayer'
import NoteEditor from '../NoteEditor/NoteEditorWidget'
import './Dock.scss';

class Dock extends React.Component {

  componentWillMount() {
  	  this.state = {
        status: false,
        styles: [
            {  top:"75px", left:"75px", position: "absolute"},
            {  right:"75px", top: "75px", position: "absolute"},
            {  right:"75px", bottom: "75px", position: "absolute"},
            {  left:"75px", bottom: "75px", position: "absolute"},
          ],
        position:1
      	};
  }

  componentWillReceiveProps(newProps) {

  }

  render() {

    let player = null

    let style = {
      visibility: "hidden"
    }

    if(this.state.status){
      style = {
        visibility:"visible"
      }
    }
    let viewer = this.props.viewer
    if(this.props.player.playStatus){
      //player = <div><SoundCloudPlayer id={this.props.player.currentSoundId} /><button onClick={this.props.handleCloseAudio}>close</button></div>
    }

    return (
    		<div id='dock-widget' style={this.state.styles[this.state.position]}>

          <button id="open-close" onClick={this.handleOpenClose.bind(this)}></button>
          <button id="move-dock" onClick={this.handleMove.bind(this)}></button>

          <div id="dock-main" style={style}>

            <div className="note-main">
              <ul>
                <li>{player}</li>

              {this.props.viewer.bibleVerses.edges.map(function(v,k){
                return <li key={k}><NoteEditor viewer={viewer} bibleVerse={v.node} noteId={viewer.note.id}/></li>;
              })}
              </ul>
            </div>


          </div>

    		</div>
    );
  }

  handleMove(e){
    let nState = this.state

    if(nState.position < 3){
      nState.position = nState.position+1
    }else{
      nState.position = 0
    }

    this.setState(nState)
  }

  handleOpenClose(e){
    let nState = this.state
    nState.status = !nState.status
    this.setState(nState)
  }

}

Dock.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Dock, {
  initialVariables: {
    id: '',
    verseId: "QmlibGVWZXJzZToxMDAxMDAx",
    noteId:"Tm90ZToyMzUxNQ=="
  },
  fragments: {
    viewer: ({verseId, noteId}) => Relay.QL`
      fragment on Viewer  {
        ${NoteEditor.getFragment('viewer', {noteId})}
        note(id:$noteId){
          id
          title
          type
          body
          tags_string
        }
        bibleVerses(id: $verseId, first: 1) {
          edges {
            node {
              ${NoteEditor.getFragment('bibleVerse')}
              id
              reference
            }
          }
        }

     }`
  }
});
