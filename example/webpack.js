// external imports
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// local imports
var projectPaths = require('../config/projectPaths')

// export webpack configuration object
module.exports = {
    entry: [projectPaths.entry],
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
          projectPaths.sourceDir,
          projectPaths.rootDir,
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
