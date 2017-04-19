import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import SearchBox from '../ListWidget/SearchBox'
import './AudioWidget.scss';

const SC = require('soundcloud');

SC.initialize({
    client_id: '2dc887a365f4c737b309f890a7ea8584',
    redirect_uri: 'https://bible.exchange/api/soundcloud'
});

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
    let filter = '';

    if (this.props.params !== undefined && this.props.params.filter !== null) {
      filter = this.props.params.filter;
      this.props.relay.setVariables({ filter: filter });
    }

	   this.state = {
      filter: filter,
      status:null,
      tracks:[],
      offset: 0,
      perPage: 5,
      playStatus: false,
      currentSoundId: null
    	};

    this.handleGetAudio();

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: null
    });

    if (newProps.filter !== this.props.filter) {
      this.props.relay.setVariables({ filter: newProps.filter });

      this.setState({
        filter: newProps.filter
      });
    }
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
      totalCount: this.state.tracks.length,
      filter: this.state.filter,
        noResultsMessage: "No audio match your search!"
    }

    return (
    		<div id='audio-widget'>

          <SearchBox
            items={items}
            details = {details}
            status={this.state.status}
            handleClearFilter={this.handleClearFilter.bind(this)}
            runScriptOnPressEnter={this.runScriptOnPressEnter.bind(this)}
            handleEditFilter={this.handleEditFilter.bind(this)}
            applyFilter={this.applyFilter.bind(this)}
            handleNextPage={this.handleNextPage.bind(this)}
          />

          <ul id="cards">
            {this.state.tracks.map((t) => {
              return <li  key={t.id} className="card"><SoundCloudCard track={t} handleClick={handlePlayAudio}/></li>;
            })}
          </ul>

    		</div>
    );
  }

  handleEditFilter(event) {
    this.setState({ filter: event.target.value });
  }

  applyFilter(event) {

    this.setState({
      status: 'loading...',
    });

    this.handleGetAudio()

  }

  handleClearFilter(event) {
    event.preventDefault();
    this.setState({ filter: '' , offset: 0});
    this.handleGetAudio()

  }

  handleNextPage() {

    let newState = this.state
    let newOffset = newState.offset + newState.perPage
    this.setState({offset: newOffset})

    this.handleGetAudio()

  }

  runScriptOnPressEnter(e) {

    if (e.keyCode == 13) {
      console.log('what key pressed?');
      this.applyFilter(e);
    }
  }

  handleGetAudio(){

    let setState = this.setState.bind(this)

    var page_size = this.state.perPage;

    let url = 'tracks'//'/users/130712524/tracks'
    let offset = this.state.offset
    let filter = this.state.filter

    SC.get(url, {
      limit: page_size, linked_partitioning: 1, offset: offset, q:"bible_exchange", tags: filter
    }).then(function(tracks) {
      setState({
        tracks: tracks.collection,
        next: tracks.next_href,
        status: null
      })
    });

  }

}

AudioWidget.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(AudioWidget, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer  {
        user{
          authenticated
        }
     }`
  }
});
