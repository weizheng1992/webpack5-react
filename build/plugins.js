const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //区分大小写
const WorkboxPlugin = require('workbox-webpack-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');

const { compilerHooks } = require('./custom-plugins');
const constants = require('./constants');
const config = require('./config');
const { resolve, assetsPath, processEnv } = require('./utils');

const basePlugins = [
  // new MomentLocalesPlugin({
  //   localesToKeep: ['es-us', 'zh-cn'],
  // }),
  new webpack.DefinePlugin(processEnv(constants.APP_ENV)),
  new ForkTsCheckerWebpackPlugin({
    typescript: { configFile: resolve('tsconfig.json') },
    eslint: { enabled: true, files: resolve('src/**/*.{ts,tsx}') },
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    inject: true,
  }),
  new CaseSensitivePathsPlugin(),
  ...compilerHooks,
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    filename: config.index,
    template: './index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash].css'),
    ignoreOrder: true,
  }),

  // CSS Tree Shaking
  new PurgeCSSPlugin({
    paths: glob.sync(`${config.assetSrc}/**/*`, { nodir: true }),
  }),

  new WorkboxPlugin.GenerateSW({
    cacheId: 'react-webpack',
    clientsClaim: true,
    skipWaiting: true,
    offlineGoogleAnalytics: false,
    inlineWorkboxRuntime: true,
    // precache ignore
    exclude: [/index\.html$/, /\.map$/],
    // dynamic update
    //runtimeCaching: [
    // {
    //   // match html
    //   urlPattern: config.pagePattern,
    //   handler: 'NetworkFirst',
    // },
    //   {
    //     // match static resource
    //     urlPattern: config.assetsPattern,
    //     handler: 'StaleWhileRevalidate',
    //   },
    // ],
  }),
  // 进度条
  new ProgressBarPlugin({
    format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
  }),
];

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins);
