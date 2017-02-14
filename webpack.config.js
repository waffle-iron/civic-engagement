const webpack = require('webpack')
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/dist');
var APP_DIR = path.resolve(__dirname, 'client');

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
       { test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};
