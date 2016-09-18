import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Helper from '../../util/MyHelpers';

class Note extends React.Component {

  componentWillMount(){
	   this.state = {
      oembed:{html:" "},
      status:"open"
    };
  }

  render() {

    let n = this.props.note.properties;

    let resourceButton =  null;

    if (n.resourceUrl !== null){
      resourceButton =   <button style={{float:"right"}} onClick={this.handleOembed.bind(this)}>{this.state.status}</button>;
    }

	return (
		<div className="bible-note" >
      {resourceButton}
			<p>{n.text}</p>
			<p>{n.tags.map(function(t){return " #"+t})}</p>
			<p><Link to={"/users/" + this.props.note.author.id}>{this.props.note.author.name}</Link></p>
        <div dangerouslySetInnerHTML={{ __html: this.state.oembed.html }} />
		</div>
		);
	}

  // Download a file form a url.
  handleOembed(e) {

    //oembed: soundcloud,
    //

    if(this.state.status == "open"){

          //let resource_url = e.target.value;
          let host_oembed_url = "http://soundcloud.com/oembed";
          let resource_url = this.props.note.properties.resourceUrl;
          let url = host_oembed_url+"?format=json&&url="+resource_url;
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

          console.log(xhr);
    }else{
      this.setState({oembed:{html:" "}, status:"open"});
    }

  }

}

export default Relay.createContainer(Note, {
  fragments: {
    note: () => Relay.QL`
      fragment on BibleNote  {
	   id
	   body
     properties {
       text
       tags
       resourceUrl
       links
     }
	   author {
	    id
	    name
	    }
     }`
  }
});
