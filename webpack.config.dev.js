var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000' },
      { test: /\.(woff|woff2)$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ],
    postLoaders: [
      {
        exclude: /node_modules/,
        loader: 'npm-install-loader',
        test: /\.js$/,
        query: {
          cli: {
            save: true
          },
        }
      }
    ]
  }
};
