const path = require('path');
const configure = require('./configure.js');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
    compress: true,
    before: (app) => configure(app),
    watchOptions: {
      poll: 300,
    },
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
};
