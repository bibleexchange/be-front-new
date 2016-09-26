import React from 'react';
import { Link } from 'react-router';

class BrowserWidget extends React.Component {

  componentWillMount(){
	   this.state = {
      oembed:[]
    };
  }

  render() {

    return (
  	<div>
          <h2 style={{textAlign:"center"}}>Previewer</h2>
          <input type="text" onBlur={this.myFunc.bind(this)} />
          <textarea value={JSON.stringify(this.state.oembed)}></textarea>
  	</div>
    )
  }

  myFunc(){
    let url = "http://api.soundcloud.com/users/130712524/tracks?client_id=2dc887a365f4c737b309f890a7ea8584&offset=300";
    let that = this;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (!xhr) {
      throw new Error('CORS not supported');
    }

    xhr.onload = function() {
     that.setState({oembed:xhr.response, status:"close"});
    };

    xhr.open('GET', url);
    xhr.send();
  }

}

export default BrowserWidget;
