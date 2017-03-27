import React from 'react';

export default class TextInput extends React.Component {
  render() {
    let mainStyle = {
      width: '100%',
      margin: '15px'
    };

    let labelStyle = {
      width: '33%',
      display: 'inline-block',
      border: 'none',
      margin: '0'
    };

    let inputStyle = {
      width: '65%',
      display: 'inline-block',
      border: 'none',
    };

    return (
        <div style={mainStyle}>
          <span style={labelStyle} >{this.props.label}</span>
          <input id={this.props.name} name={this.props.name} onChange={this.props.handleEdit} style={inputStyle} type='text' value={this.props.value} />
        </div>

    );
  }

}
