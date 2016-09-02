import React from 'react';
import styles from './Page.scss';

export default class Feature extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    heading: React.PropTypes.string.isRequired
  };

  render() {
    let heading = "";
    
	if(this.props.heading !== ""){
	  heading = <h1 className="heading">{this.props.heading}</h1>;
    }
	
	return (
      <main>
	    {heading}
        {this.props.children}
      </main>
    );
  }
}
