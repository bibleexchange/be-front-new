import React from 'react';

class HeadComponent extends React.Component {

  render() {

    this.updateHead().bind(this);

  	return (<div></div>);
	}

  updateHead(){
    document.getElementById("first-child").innerHTML = <meta name="one" />;

    /* = function(){
      return (<head>

            <meta charset="utf-8">
            <title>Bible exchange666</title>

            <link rel="icon" type="image/png" href="<%= require('./assets/favicons/favicon.ico') %>" sizes="16x16">

            <meta name="application-name" content="Bible exchange"/>
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans&amp;subset=latin">
            <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Arvo&amp;subset=latin">

            </head>);
    };*/
  }

}
