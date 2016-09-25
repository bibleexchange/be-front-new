'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  title:"this is a test",
  entry: {
    app: [
      path.join(__dirname, 'client/index.js'),
      'webpack-dev-server/client?http://127.0.0.1:3000',
      'webpack/hot/only-dev-server'
    ],
    vendor: ['react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
  },
  output: {
      publicPath: 'http://127.0.0.1:3000/',
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  devtool: 'eval',
  module: {
    loaders: [
	{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
		'postcss',
		'sass'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
      loader: 'url-loader?limit=1000000&name=assets/[hash].[ext]'
    },
	{
	  test: /\.eot/,
      loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
    }, {
      test: /\.ttf/,
      loader: 'url-loader?mimetype=application/x-font-ttf'
    }
	]
  },
  postcss: function() {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Bible exchange | Your Place for Bible Sharing and Discovery',
      template: './client/index.html',
      mobile: true,
      inject: false
    })
  ]
};
