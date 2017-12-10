import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import NoteViewer from './NoteViewer';

class NotePageComponent extends React.Component {

        render() {

      let viewer = null

      if(this.props.note === undefined){
          viewer = null
      }else{
          viewer =  <NoteViewer note={this.props.note} user={this.props.user} /> 
      }


    return (
      	<div>{viewer}</div>
    );
  }

}

NotePageComponent.propTypes = {
    user: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(NotePageComponent, {
    user: graphql`
      fragment NotePageComponent_user on User {
          ...NoteViewer_user
          authenticated
  }`,

    note: graphql`
      fragment NotePageComponent_note on Note {
        id
        ...NoteViewer_note

    }`,

});