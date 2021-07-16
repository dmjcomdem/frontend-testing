module.exports = {
  server: {
    command: 'npm start',
    port: 5000,
  },
  launch: {
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 1280,
    },
    args: [
      '--no-sandbox',
    ],
    browserContext: 'default',
  },
};
