module.exports = {
  mode: 'development',

  devServer: {
    disableHostCheck: true,
    watchContentBase: true,
    contentBase: './public',
    host: '0.0.0.0',
    port: 8080,
    public: '0.0.0.0',
    overlay: true,
    watchOptions: {
      poll: 300,
    },
  },
};
