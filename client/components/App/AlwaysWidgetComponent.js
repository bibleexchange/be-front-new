/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import './AlwaysWidget.scss';
import './Typography.scss';

function objectToArray(object, exceptArray=empty){

  let array = [];

    for(var key in object) {
      if(key !== "__dataID__"){
          array.push({key:key, value:object[key]});
      }
    }
    return array;
}
//        <div dangerouslySetInnerHTML={{ __html: this.state.oembed.html }} />
class AlwaysWidgetComponent extends React.Component {

componentWillMount(){
  this.state = {
    note: this.props.note,
    oembed: {}
  };
}

  render() {
    let noteProperties = this.props.note.properties;
    const fieldStyle = {
      display:"block"
    };

  let inputs = objectToArray(noteProperties, []);
console.log(inputs);
    return (
      <div id="alwaysWidget">

      <center>Note Editor</center>

    <form onSubmit={this.props.handleChangeNote} >
      <input type="hidden" id="noteid" name="noteid" value={this.state.note.id} />
       Scripture: <input type="text" id="reference" name="reference" value={this.state.note.verse.reference} />

         {/*PROPERTIES MAPPED*/}
         {inputs.map(function(p){
           return (<div>{p.key.toUpperCase()} : <input style={fieldStyle} name={p.key} id={p.key} type="text" value={p.value} /></div>);
         })}
       <input id="submit" name="submit" type="submit" value="save"/>
     </form>
     <hr />
      <h2>Oembed</h2>
      </div>
    );
  }

}

AlwaysWidgetComponent.propTypes = {
    note: React.PropTypes.object.isRequired,
    oembed: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(AlwaysWidgetComponent, {
  initialVariables: {
	noteId:"1"
  },
  fragments: {
    note: () => Relay.QL`fragment on Note {
      	id
      	type
      	user_id
      	body
      	bible_verse_id
      }`,
      verse: () => Relay.QL`fragment on BibleVerse {
            id
            reference
        }`
  },
});

//	${BibleNavigation.getFragment('bibleChapter')}
