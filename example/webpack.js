// external imports
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// export webpack configuration object
module.exports = {
  entry: ['./example/index.js'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(png|jpg|ttf)$/,
        loader: 'url-loader',
        query: {limit: 10000000},
      }
    ]
  },
  resolve: {
    modules: [
      './src',
      'node_modules',
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './example/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || 'dev',
    })
  ],
  devtool: 'inline-source-map',
}
