import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterComponent';
import AlwaysWidget from './AlwaysWidgetComponent';
import Relay from 'react-relay';

import './App.scss';
import './Images.scss';
import './Print.scss';
import './Typography.scss';

import '../../assets/favicons/favicon.ico';

class App extends React.Component {

    componentWillMount(){
      this.state = {
       oembedStatus:"closed",
       noteStatus:"closed",
       oembed:{},

     };
    }

    render() {

    return (
		  <div>
			<MainNavigation location={this.props.location} updateIt={this.state} route={this.props.route} user={this.props.viewer.user} handleUpdateBookmarks={this.handleUpdateBookmarks.bind(this)}/>
			  {this.props.children}

			  <Footer user={this.props.viewer.user}/>
        {/*
          <AlwaysWidget
            oembed={this.state.oembed}
            note={this.props.viewer.note}
            handleChangeNote={this.handleChangeNote.bind(this)}
            handleChangeOembed={this.handleChangeOembed.bind(this)}
            />
        */}
		  </div>
    );
  }

  handleUpdateBookmarks(string){
    this.setState({string});
  }

  handleChangeOembed(resourceUrl) {
    console.log('change oembed please...', resourceUrl);
    //oembed: soundcloud,
          let host_oembed_url = "http://soundcloud.com/oembed";
          let resource_url = resourceUrl;
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
    }

  handleChangeNote(event) {
    event.preventDefault();
    console.log('change note please...');

    let inputs = event.target.getElementsByTagName("input");

    let data = [];
    let i = 0;

    while (i < inputs.length){
       let x = {key:inputs[i].getAttribute('name'), value:inputs[i].getAttribute('value')};
       data.push(x);
       i++;
    }
    console.log(data);
  }

}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

App.propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(App, {
  initialVariables: {
    token:"dummystring",
    noteId: "1",
    verseId: "01001001"
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          user(token:$token){
            email
            ${MainNavigation.getFragment('user')}
            ${Footer.getFragment('user')}
          }
          note(id:$noteId){
            ${AlwaysWidget.getFragment('note')}
          }
          bibleVerse(id:$verseId){
            ${AlwaysWidget.getFragment('verse')}
          }
      }
    `,
  },
});
