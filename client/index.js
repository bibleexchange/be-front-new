// core setup
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import MyNetworkLayer from './MyNetworkLayer';

// routing
import Route from './Route';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

// send to dom
const mountNode = document.getElementById('root');

if (process.env.GRAPHQL_SERVER_IS === 'mock') {
 // havent fugured this out yet
} else {
  Relay.injectNetworkLayer(new MyNetworkLayer(localStorage.getItem('be_token'), process.env.GRAPHQL_ENDPOINT));
}

ReactDOM.render(
    <Router
      history={browserHistory}
      routes={Route}
      render={applyRouterMiddleware(useRelay)}
      environment={Relay.Store}
    />,
  mountNode
);
