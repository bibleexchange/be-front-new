import React from 'react';

/*

import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress } from 'react-soundplayer/components';
const { PropTypes, Component } = React;
import { Icons } from 'react-soundplayer/components';

require('../stylesheets/player/buttons.css');
require('../stylesheets/player/cover.css');
require('../stylesheets/player/icons.css');
require('../stylesheets/player/progress.css');

const {
    SoundCloudLogoSVG,
    PlayIconSVG,
    PauseIconSVG,
    NextIconSVG,
    PrevIconSVG
} = Icons;


class Player extends Component {
    render() {
        let { track, currentTime, duration } = this.props;
		let user = track.user;

        return (
            <div><div className333="p2 border navy mt1 mb3 flex flex-center rounded">
                <PlayButton className="flex-none h4 mr2 button white button-big button-outline button-grow bg-orange circle" {...this.props} />
                <div className="flex-auto">
                    <Progress
                        className="mt1 mb1 rounded"
                        innerClassName="rounded-left"
                        value={currentTime / duration * 100 || 0}
                        {...this.props}
                    />
                </div>
            </div>
			 <h2 className="h4 nowrap m0"><a href={user.permalink_url}><img style={{height:"40px"}} src={user.avatar_url} />{user.username}</a> <span className="h4 nowrap caps m0">{track.title}</span> <a href={track.download_url} style={{float:"right"}}>download</a></h2>
</div>

        );
    }

}

class ProgressSoundPlayer extends Component {
    render() {
        return (
            <SoundPlayerContainer {...this.props}>
                <Player />
            </SoundPlayerContainer>
        );
    }

	iframe(){
		return <iframe width="100%" height="166" scrolling="no" frameborder="no" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+this.props.file+"&amp;color=0066cc&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"}></iframe>;
	}

}

ProgressSoundPlayer.propTypes = {
    resolveUrl: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired
};

Player.defaultProps = { track: {user:{}} };

*/


class Blank extends React.Component {
  render() {
    return (<div />);
  }

}

module.exports = Blank;
