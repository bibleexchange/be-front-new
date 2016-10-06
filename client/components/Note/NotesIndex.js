import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NotesWidget from './NotesWidget';

import '../Bible/NotesWidget.scss';

class NotesIndex extends React.Component {

  render() {

    let filterBy = '';

    if(this.props.params.filterBy !== undefined){
      filterBy = this.props.params.filterBy;
    }

    return (
      	<div id="bible" className="WidgetContainer">
              <div className="Widget">
                <NotesWidget
                  filter={filterBy}
                  viewer={this.props.viewer}
                  selectNote={null}
                  tags={true}
                   />
              </div>
       	</div>
    );

  }

	_handleLoadMoreNotes(){
		console.log('loading data...');
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
