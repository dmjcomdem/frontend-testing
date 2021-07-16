const configure = require('./configure');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  devtool: 'source-map',

  devServer: {
    disableHostCheck: true,
    watchContentBase: true,
    contentBase: './public',
    host: '0.0.0.0',
    port: 8080,
    public: '0.0.0.0',
    overlay: true,
    setup: (app) => configure(app),
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
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
          presets: [
            '@babel/react',
          ],
        },
      },
    ],
  },
};
