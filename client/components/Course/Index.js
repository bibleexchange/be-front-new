import React from 'react';
import { browserHistory, Link } from "react-router";
import Navigation from './Navigation';
import BibleActionCreators from '../../actions/BibleActionCreators';
import BibleStore from '../../stores/BibleStore';
import BibleChapterStore from '../../stores/BibleChapterStore';

require('./Course.scss');
 
class Index extends React.Component {
	
  render() {
	
	return (
      <div>			
		<Navigation />
		{this.props.children}
      </div>
    )
  }
  
}

module.exports = Index;