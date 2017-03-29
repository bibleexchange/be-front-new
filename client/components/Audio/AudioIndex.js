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
  initialVariables: {
    after: null,
    pageSize: 5,
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        ${AudioWidget.getFragment('viewer')}
       }`,
  }
});
