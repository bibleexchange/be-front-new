/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';
import config from './config/environment';

// Launch Relay by using webpack.config.js
const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });

// Serve static resources
relayServer.use('/', express.static(path.join(__dirname, '../build')));
relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
