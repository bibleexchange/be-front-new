import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NotesWidget from './NotesWidget';

class NotesIndex extends React.Component {

  componentWillMount(){

    let filterBy = this.props.params.filterBy;

    if(filterBy == undefined && localStorage.getItem('notes-filter') !== null){
      filterBy = localStorage.getItem('notes-filter');
    }else if(filterBy == undefined ){
      filterBy = "";
    }

    localStorage.setItem('notes-filter',filterBy);

  	this.state = {
  	  filterBy:filterBy
  	};
  }

  render() {

    return (
      	<div id="bible" className="WidgetContainer">
              <div className="Widget">
                <NotesWidget
                  filter={this.state.filterBy}
                  viewer={this.props.viewer}
                  selectNote={null}
                  tags={true}
                   />
              </div>
       	</div>
    );

  }

  handleSelectNote(e){
    let noteString = e.target.dataset.note;
    localStorage.setItem('selected-note', noteString);

  }

}

NotesIndex.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NotesIndex, {
  initialVariables: {
    after: null,
  	pageSize: 5,
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
         ${NotesWidget.getFragment('viewer')}
       }`,
  }
});
