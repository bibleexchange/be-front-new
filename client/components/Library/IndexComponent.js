import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import CoursesWidget from './CoursesWidget';
import './Index.scss';

class Index extends React.Component {

  render() {
    return (
	      <div className='WidgetContainer' >
          <div className='Widget'>

          <CoursesWidget
            viewer={this.props.viewer}
          />

          </div>
	      </div>
    );
  }

}

Index.defaultProps = {};

export default Relay.createContainer(Index, {
  fragments: {
	   viewer: () => Relay.QL`
	  fragment on Viewer {
      ${CoursesWidget.getFragment('viewer')}
		}`
  }
});
