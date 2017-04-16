import React from 'react'

class SoundCloudPlayer extends React.Component {

  render() {
      let srcString = null
      let player = <p>(no audio was selected)</p>

      if (this.props.status === true){
          srcString =  srcString = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.props.id + '&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false';
          player = <div><iframe key={this.props.id} width='100%' height='130px' scrolling='no' frameBorder='no' src={srcString}></iframe>
              <button onClick={this.props.handleCloseAudio}>close</button></div>
      }

      return (player)
  }

}

export default SoundCloudPlayer
