const path = require('path');

const { APP_ENV, IS_DEV, NODE_ENV } = require('./constants');

// static resource domain（CDN）
const STATICDOMAIN = APP_ENV === 'prod' ? '.' : '';

module.exports = {
  // output html
  index: path.resolve(__dirname, `./../dist/${APP_ENV}/index.html`),
  assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
  assetSrc: path.resolve(__dirname, 'src'),
  assetsPublicPath: IS_DEV ? '/' : `${STATICDOMAIN}/`,
  assetsSubDirectory: 'static',
  alias: {
    '@': path.resolve(__dirname, '../src/'),
  },
  // page Pattern for workbox
  // pagePattern: new RegExp(DOMAIN),
  // id you use CDN, change it!!!
  // assetsPattern: new RegExp(`${DOMAIN.replace(/\//g, "\\/")}\\/static`),
  // production sourceMap for monitoring
  sourceMap:
    NODE_ENV === 'development'
      ? 'eval-source-map'
      : NODE_ENV === 'production'
      ? 'source-map'
      : false,
  extractCss: NODE_ENV !== 'development',
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
};
