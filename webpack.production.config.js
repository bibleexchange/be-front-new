'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: [
      path.join(__dirname, 'client/index.js')
    ],
    vendor: ['react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
    {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=./assets/fonts/[name].[ext]'},
    {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=./assets/fonts/[name].[ext]"},
    {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=./assets/fonts/[name].[ext]'},
    {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=./assets/svg/[name].[ext]'},
    {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=./assets/img/[name].[ext]'},
    {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
    {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
    {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader","sass-loader") },
]
  },
  postcss: function() {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Bible exchange | Your Place for Bible Sharing and Discovery',
      template: './client/index.html',
      mobile: true,
      inject: false
    }),
    new ExtractTextPlugin('styles.css'),
  ]
};
