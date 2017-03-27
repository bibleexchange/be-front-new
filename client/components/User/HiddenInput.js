import React from 'react';

export default class HiddenInput extends React.Component {
  render() {
    return (
          <input id={this.props.name} name={this.props.name} onChange={this.props.handleEdit} type='hidden' value={this.props.value} />
    );
  }

}
