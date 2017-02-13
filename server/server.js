// "use strict"
require('dotenv').config();
const express = require('express');
const path = require('path');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes.js');
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
app.use('/api', routes);

app.use(express.static(path.join(__dirname, '../client')));
app.get('/test', (req, res) => { console.log('got it'); res.send({ data: 'data!' }); });

app.listen(port, () => {
  console.log('Listening on port ', port);
});

module.exports = app;
