// @see https://webpack.js.org/configuration/
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// это правило для javascript
const javascript = {
  test: /\.(js)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader'
  }]
};

// основной конфиг вебпака
const config = {
  entry: ['babel-polyfill', './src/js/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
    chunkFilename: '[name].[chunkhash:8].min.js',
    publicPath: '/build/js/'
  },
  module: {
    rules: [ javascript ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

module.exports = config;
