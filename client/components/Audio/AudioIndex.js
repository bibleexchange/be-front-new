import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import AudioWidget from './AudioWidget';

class AudioIndex extends React.Component {

  render() {
    return (
      	<div id='audio' className='WidgetContainer'>
              <div className='Widget'>
                <AudioWidget
                  filter={this.props.params.filter}
                  viewer={this.props.viewer}
                  handlePlayAudio={this.props.handlePlayAudio}
                  audioWidget={this.props.audioWidget}
                  handleNextAudioPage={this.props.handleNextAudioPage}
                  applyAudioFilter={this.props.applyAudioFilter}
                  user={this.props.user}
                  updateAudioWidget={this.props.updateAudioWidget}
                />
              </div>
       	</div>
    );
  }

}

AudioIndex.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(AudioIndex, {
  fragments: {
    user: () => Relay.QL`fragment on User {
        ${AudioWidget.getFragment('user')}
       }`,
  }
});
