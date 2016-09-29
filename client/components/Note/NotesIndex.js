import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import NotesWidget from './NotesWidget';

class NotesIndex extends React.Component {

  render() {

    return (
			<Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
                <NotesWidget filter={''} viewer={this.props.viewer} />
              </div>
       	</div>
      </Page>
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
