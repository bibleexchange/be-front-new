/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import { apolloServer } from 'apollo-server';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';
import config from './config/environment';
import { Schema } from './data/schema';
import Mocks from './data/mocks';

  // Launch GraphQL
  const graphQLServer = express();

	graphQLServer.use('/graphql', apolloServer({
	  graphiql: true,
	  formatError: (error) => ({
		message: error.message,
		details: error.stack
	  }),
	  pretty: true,
	  schema: Schema,
	  mocks: Mocks
	}));
	
	graphQLServer.listen(config.graphql.port, () => console.log(chalk.green(
	  `GraphQL Server is now running on http://127.0.0.1:${config.graphql.port}/graphql`)
	));
  
  // Launch Relay by using webpack.config.js
  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/graphql': `http://127.0.0.1:${config.graphql.port}`
    },
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });

  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));

