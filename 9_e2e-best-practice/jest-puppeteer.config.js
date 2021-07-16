module.exports = {
  server: {
    command: 'npx webpack serve --mode=development',
    port: 8080,
    launchTimeout: 15000,
  },
  launch: {
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--no-sandbox',
    ],
  },
};
