import React from 'react';

class UserMessage extends React.Component {

  componentWillMount() {
    this.state = {
      status: false
    }

    setTimeout(this.flipOff.bind(this), 5000)
    
  }

  componentWillReceiveProps(newProps) {
    if(newProps.error.code !== this.props.error.code){
        this.flipOff()
        setTimeout(this.flipOff.bind(this), 5000)
    }

  }

  render() {
    return (
          <div id='im-online' className={'online'+this.state.status}>
            <h2>{this.props.error.code}: {this.props.error.message}</h2>
          </div>
            );
  }

  flipOff(){
      console.log('shutting off notifications')
      let newState = this.state
      newState.status = !newState.status
      this.setState(newState)
  }


}

UserMessage.propTypes = {
  error: React.PropTypes.object.isRequired,
};

export default UserMessage;
