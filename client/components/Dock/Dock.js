import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
import SoundCloudPlayer from './SoundCloudPlayer'
import NoteEditor from '../NoteEditor/NoteEditorWidget'
import './Dock.scss';

class Dock extends React.Component {

  componentWillMount() {
  	  this.state = {
        status: false,
        styles: [
            {  top:"0", left:"0", position: "fixed"},
            {  right:"0", top: "0", position: "fixed"},
            {  right:"0", bottom: "0", position: "fixed"},
            {  left:"0", bottom: "0", position: "fixed"},
          ],
        position:2
      	};
  }

  componentWillReceiveProps(newProps) {

  }

  render() {

    let player = <div style={{width:"100px"}}> </div>

    let style = {
      display:"none"
    }

    if(this.state.status){
      style = {
        display:"block"
      }
    }

    if(this.props.player.playStatus){
      player = <div><SoundCloudPlayer id={this.props.player.currentSoundId} /><button onClick={this.props.handleCloseAudio}>close</button></div>
    }

    return (
    		<div id='dock-widget' style={this.state.styles[this.state.position]}>

          <button id="open-close" onClick={this.handleOpenClose.bind(this)}></button>

          <div style={style}>
            <button id="move-dock" onClick={this.handleMove.bind(this)}></button>
            <div className="note-main">
              <ul>
                <li>{player}</li>
                <li><NoteEditor viewer={this.props.viewer} bibleVerse={this.props.bibleVerse} /></li>
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
    id: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer  {
        ${NoteEditor.getFragment('viewer')}
     }`,
     bibleVerse: () => Relay.QL`
       fragment on BibleVerse  {
         ${NoteEditor.getFragment('bibleVerse')}
         id
      }`
  }
});
