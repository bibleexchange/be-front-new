//core setup
import React from 'react';
import ReactDOM from 'react-dom';
import Relay, { DefaultNetworkLayer, RootContainer } from 'react-relay';
import createHashHistory from 'history/lib/createHashHistory';

//routing
import routes from './routes';
import {IndexRoute, Route, Router} from 'react-router';
import {applyRouterMiddleware, useRouterHistory } from 'react-router';
import useRelay from 'react-router-relay';

//queries
import ViewerQueries from './queries/ViewerQueries';
//import LibraryQueries from './queries/LibraryQueries';

/*
const WidgetQueries = {
  widget: () => Relay.QL`query { widget(widgetId: $widgetId) }`
}
*/

//relay containers/components
import App from './components/App/AppContainer';
import Bible from './components/Bible/BibleContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Login from './components/Login/LoginComponent';
import Signup from './components/Signup/SignupComponent';

//send to dom
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

const history = useRouterHistory(createHashHistory)();

ReactDOM.render(
    <Router
    history={history} routes={routes}
    render={applyRouterMiddleware(useRelay)}
  />,
  mountNode
);