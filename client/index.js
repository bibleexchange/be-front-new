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

ReactDOM.render(
    <Router 
	history={browserHistory} 
	routes={Route} 
	render={applyRouterMiddleware(useRelay)} 
	environment={Relay.Store} />,
  mountNode
);