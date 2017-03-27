import React from 'react';

export default class ToggleBible extends React.Component {

  render() {
    return (
		<button id='toggle-bible' className={this.props.title} onClick={this.props.handleToggleBible}>{this.props.title}</button>
    );
  }

}
