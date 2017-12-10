import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import SearchBox from '../ListWidget/SearchBox'
import './AudioWidget.scss';

//const SC = require('soundcloud')
const SC = {get: function(){console.log('disabling for testing')}};

class SoundCloudCard extends React.Component {

  render() {
    let t = this.props.track

      return (<div>
        <img src={t.artwork_url} />
        <h2>{t.title}</h2>

        <p>{t.description}</p>
         <button onClick={this.props.handleClick} data-id={t.id}>play</button>
        </div>)

  }

}

class AudioWidget extends React.Component {

  componentWillMount() {

    SC.initialize({
        client_id: '2dc887a365f4c737b309f890a7ea8584',
        redirect_uri: 'https://bible.exchange/api/soundcloud'
    });

    let filter = '';

    if (this.props.params !== undefined && this.props.params.filter !== null) {
      filter = this.props.params.filter;
      this.props.handleApplyAudioFilter(filter);
    }

    this.state = {
        showModal: false,
        filter: "",
        currentPage: 1,
        tracks:[],
        offset: 0,
        perPage: 5,
        playStatus: false,
        currentSoundId: null,
        status: null
    }
    let that = this

    setTimeout(that.handleGetAudio.bind(that),500)

  }

  render() {

    let handlePlayAudio = this.props.handlePlayAudio

    let items = {
      pageInfo: {
        hasNextPage: true
      }
    }
    let details = {
      title: {
        singular: "Audio",
        plural: "Audio"
      },
      totalCount:  'Many :)',
      filter: this.state.filter,
      noResultsMessage: "No audio match your search!",
      currentPage: this.state.currentPage
    }

    return (
    		<div id='audio-widget'>

          <SearchBox
            items={items}
            details = {details}
            status={this.state.status}
            handleUpdateFilter={this.handleApplyAudioFilter.bind(this)}
            handleNextPage={this.handleNextAudioPage.bind(this)}
          />

          <ul id="cards">
            {this.state.tracks.map((t) => {
              return <li  key={t.id} className="card"><SoundCloudCard track={t} handleClick={handlePlayAudio}/></li>;
            })}
          </ul>

    		</div>
    );
  }

  handleGetAudio(){

    let audio = this.state
    let url = 'tracks'//'/users/130712524/tracks'
    let that = this
    let data = {}

    SC.get(url, {
      limit: audio.perPage, linked_partitioning: 1, offset: audio.offset, q:"bible_exchange", tags: audio.filter
    }).then(function(tracks) {      
      audio.tracks = tracks.collection
      audio.next = tracks.next_href
      audio.status = null
      audio.currentPage = 1
      that.setState(audio)
    });

  }

  handleNextAudioPage() {

    let newState = this.state
    newState.offset = newState.offset + newState.perPage
    newState.currentPage = newState.currentPage+1
    this.setState(newState)

    this.handleGetAudio()
  }

  handleApplyAudioFilter(str){

    let newState = this.state
    newState.filter = str
    newState.status = 'loading...'
    this.setState(newState)

    this.handleGetAudio()
  }

}

AudioWidget.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default createFragmentContainer(AudioWidget, {
  user: graphql`
    fragment AudioWidget_user on User  {
        authenticated
   }`
});
