import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NotesWidget from './NotesWidget';

class NotesIndex extends React.Component {

  render() {
    return (
      	<div id='bible' className='WidgetContainer'>
              <div className='Widget'>
                <NotesWidget
                  filter={this.props.params.filter}
                  viewer={this.props.viewer}
                  selectNote={null}
                  tags
                />
              </div>
       	</div>
    );
  }

  handleSelectNote(e) {
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
    pageSize: 5
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
         ${NotesWidget.getFragment('viewer')}
       }`,
  }
});
