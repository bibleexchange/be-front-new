'use strict';
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// multiple extract instances
const extractCSS = new ExtractTextPlugin('css-[name].css');
const extractSASS = new ExtractTextPlugin('styles.css');

var config = {
    devtool: 'cheap-module-source-map',
    entry: [
      path.join(__dirname, 'client/index.js')
    ],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'app.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'GRAPHQL_ENDPOINT':JSON.stringify('/graphql'),
            'GRAPHQL_SERVER_IS':JSON.stringify('mysql')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
        	      screw_ie8: true
            }
        }),
	    new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
	    new HtmlWebpackPlugin({
	      title: 'Bible exchange | Your Place for Bible Sharing and Discovery',
	      template: './client/index.html',
	      mobile: true,
	      inject: false
	    }),
	    extractSASS,
      extractCSS,
    ],
    module: {
        loaders: [
            {test: /\.js$/,loaders: ['babel'],exclude: /node_modules/},
      	    {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=./assets/fonts/[name].[ext]'},
      	    {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=./assets/fonts/[name].[ext]"},
      	    {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=./assets/fonts/[name].[ext]'},
      	    {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=./assets/svg/[name].[ext]'},
      	    {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=./assets/img/[name].[ext]'},
      	    {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.scss$/i, loader: extractSASS.extract(["css","sass"])},
            {test: /\.css$/i, loader: extractCSS.extract(["css"])},
        ]
    },
  postcss: function() {
    return [precss, autoprefixer];
  }
};

module.exports = config;
