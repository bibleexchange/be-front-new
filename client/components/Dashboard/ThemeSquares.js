import React from 'react';
import BeLogo from '../Svg/BeLogo';

require('./ThemeSquares.scss');

class ThemeSquares extends React.Component {

  render() {
    return (
     <div id='theme-squares'>
			<div className='be-logo square'><BeLogo /></div>
			<div className='moses square'></div>
			<div className='apostles square'></div>
			<div className='paul square'></div>
			<div className='creation square'></div>
			<div className='moses square'></div>
			<div className='be-logo2 square'><BeLogo /></div>
		</div>
    );
  }

}

module.exports = ThemeSquares;
