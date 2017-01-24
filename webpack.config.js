module.exports = {
  entry: './app/App.js',
  output: {
    path: __dirname + '/public',
    publicPath: '/public',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
