import React from 'react';

class MagnifyingGlass extends React.Component {

  render() {
    return (
       <svg id="magnifying-glass" x="0" y="0" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
  	<title id="title">Magnifying Glass Icon</title>
          <path d="M78.4,17.2c-32.6,0-59.1,26.4-59.1,59.1s26.4,59.1,59.1,59.1c32.6,0,59.1-26.4,59.1-59.1S111,17.2,78.4,17.2z M78.4,120.4c-24.4,0-44.1-19.7-44.1-44.1S54,32.2,78.4,32.2c24.4,0,44.1,19.7,44.1,44.1S102.7,120.4,78.4,120.4z" />
          <rect x="115.5" y="139.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 149.7833 -61.8885)" fillOpacity="0" stroke="#1FCC87" strokeWidth="9"/>
          <rect x="108.3" y="116" transform="matrix(0.7071 0.7071 -0.7071 0.7071 123.6279 -51.0546)" fillOpacity="0" stroke="#1FCC87" strokeWidth="9"/>
        </svg>
    );

  }

}

module.exports = MagnifyingGlass;
