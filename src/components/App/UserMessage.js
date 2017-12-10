import React from 'react';

class UserMessage extends React.Component {

  componentWillMount() {
    this.state = {
      status: false,
      log: [this.props.error]
    }

    setTimeout(this.flipOff.bind(this), 4000)
    
  }

  componentWillReceiveProps(newProps) {

    let test = false

    if(newProps.error.message !== this.props.error.message){
      test = true
    }

    if(test){
      let n = this.state
      n.log.unshift(newProps.error)
      this.setState(n)
        this.flipOff()
        setTimeout(this.flipOff.bind(this), 4000)
    }
  }

  render() {
    return (
          <div id='im-online' className={'online'+this.state.status}>
            <h2>{this.props.error.code}: {this.props.error.message}

            {/*this.state.log.map(function(e){
              return <span>{e.code} : {e.message}</span>
            })*/}
            </h2>

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
