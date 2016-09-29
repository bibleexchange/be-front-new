//core setup
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import MyNetworkLayer from './MyNetworkLayer';

//routing
import Route from './Route';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

//register service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js', {scope: './'})
        .then(function (registration) {
            console.log(registration);
        })
        .catch(function (e) {
            console.error(e);
        })
} else {
    console.log('Service Worker is not supported in this browser.')
}

//send to dom
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

if(process.env.GRAPHQL_SERVER_IS === "mock"){
 //ahavent fugured this out yet
}else{
  Relay.injectNetworkLayer(new MyNetworkLayer(localStorage.getItem('be_token'), process.env.GRAPHQL_ENDPOINT));
}

  ReactDOM.render(
    <Router 
	history={browserHistory} 
	routes={Route} 
	render={applyRouterMiddleware(useRelay)} 
	environment={Relay.Store} />,
  mountNode
);

