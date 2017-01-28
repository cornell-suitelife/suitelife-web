var webpack = require('webpack');

module.exports = {
  entry: './app/App.js',
  output: {
    path: './public/js',
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
