import React from 'react';

class StatusComponent extends React.Component {

  render() {
    let component = <div />;

    switch (this.props.type) {
      case 'done':
        component = <span style={{ color: 'green' }}dangerouslySetInnerHTML={{ __html: '&#x2713;' }} ></span>;
        break;
      case 'changes-not-saved':
        component = <span style={{ color: 'gray' }}dangerouslySetInnerHTML={{ __html: '...changes not saved' }} ></span>;
        break;
      case 'saving':
        component = <span style={{ color: 'red' }}dangerouslySetInnerHTML={{ __html: '...saving' }} ></span>;
        break;
      case 'original':
        component = <span style={{ color: 'green' }}dangerouslySetInnerHTML={{ __html: 'nothing changed' }} ></span>;
        break;
      default:
        component = <div />;
    }

    return component;
  }

}

export default StatusComponent;