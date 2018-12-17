const path = require('path');
const webpack = require('webpack');

let isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },
  devServer: {
    contentBase: './public',
    watchContentBase: true,
  },
  devtool: isProduction ? false : 'source-map',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
        BASE_URL: isProduction ? "'https://ant-pavel.github.io/js-20181018/public/'" : "'/'",
      }),
  ],
}