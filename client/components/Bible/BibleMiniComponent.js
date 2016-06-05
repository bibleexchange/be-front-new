/* eslint-disable global-require */
import React from 'react';
import BibleVerseFocus from './BibleVerseFocus';
import BibleNavigation from './Navigation';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

import './Bible.scss';

class BibleMiniComponent extends React.Component {

  render() {

    return (
      <div>
			<BibleNavigation />
			
			{this.props.viewer.bibleNavs.map(function(nav,index){
				return (<BibleVerseFocus key={index} data={nav} />);
			})}
      </div>
    );
  }
} 

BibleMiniComponent.propTypes = {
    viewer: React.PropTypes.object.isRequired
  };
  
export default BibleMiniComponent;
