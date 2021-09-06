const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 2000, // 2kb 이상은 file-loader가 처리
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date : ${new Date().toLocaleString()}
        Author : ${childProcess.execSync('git config user.name')}
      `,
    }),
    new DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(Dev)' : '',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
  ],
};
