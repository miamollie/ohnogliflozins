const withOffline = require('next-offline');

const nextConfig = {
  generateInDevMode: false,
  dontAutoRegisterSw: true,
  generateSw: false,
  devSwSrc: './public/sw.js',
  workboxOpts: {
    swSrc: './public/sw.js',
    swDest: './public/service-worker.js',
  },
};

module.exports = withOffline(nextConfig);
