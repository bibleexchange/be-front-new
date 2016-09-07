//core setup
import React from 'react';
import ReactDOM from 'react-dom';
import Relay, { DefaultNetworkLayer, RootContainer } from 'react-relay';
import createHashHistory from 'history/lib/createHashHistory';

//routing
import Route from './Route';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

//send to dom
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);


var token = localStorage.getItem('jwt');
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
);


ReactDOM.render(
    <Router 
	history={browserHistory} 
	routes={Route} 
	render={applyRouterMiddleware(useRelay)} 
	environment={Relay.Store} />,
  mountNode
);
