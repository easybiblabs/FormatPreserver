module.exports = {
  debug: false,
  cache: false,
  entry: {
    'index': './src'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    root: "" + __dirname + "/"
  }
};
