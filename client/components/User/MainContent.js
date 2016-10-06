import React from 'react';
import { Link } from 'react-router';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';
import NewLessonForm from './NewLessonForm';
import LessonEditor from './LessonEditor';

import './MainContent.scss';

class NoLessonSelected extends React.Component {

  render() {

    let style = {
      color: "rgba(255,255,255,0.5)",
      textAlign:"center",
      fontSize:"2em",
      textShadow: "-2px 0 #adaaaa, 0 2px #adaaaa, 2px 0 #adaaaa, 0 -2px #adaaaa",
      fontStyle:"italic"
    };

    return (
      <div id="lesson">
        <div id="main" style={style}>
            <h1>Select a Lesson to Edit.</h1>
            <div id="notes-count"></div>
        </div>
        <div id="notes"></div>
      </div>
    );
  }

}

class MainContent extends React.Component {

  render() {
    let editor = <NoLessonSelected />;

    if(this.props.children !== null){
      editor = React.cloneElement(this.props.children, { note: this.props.note });
    }

    return (
    	<div id="main-content">
        {editor}
    	</div>
    );
  }

}

MainContent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Relay.createContainer(MainContent, {
  fragments: {
      note: () => Relay.QL`fragment on Note {
          id
          author {
            name
          }
          type
          output{
            type
            body
          }
      }`,

 },
});
