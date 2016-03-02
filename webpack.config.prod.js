var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000' },
      { test: /\.(woff|woff2)$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
