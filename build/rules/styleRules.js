const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./../config');

const cssLoader = (modules) => ({
  loader: 'css-loader',
  options: {
    import: true,
    modules: modules
      ? {
          mode: 'local',
          localIdentName: '[local]--[contenthash:base64:8]',
        }
      : false,
  },
});
const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

const baseLoaders = (modules) => [
  config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  cssLoader(modules),
  'postcss-loader',
];

module.exports = [
  {
    test: /\.css$/,
    use: baseLoaders(false),
  },
  {
    // for ant design
    test: /\.less$/,
    // less do not use threadLoader
    // https://github.com/webpack-contrib/thread-loader/issues/10
    use: [...baseLoaders(false), lessLoader],
  },
];
