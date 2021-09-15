const openBrowser = require('react-dev-utils/openBrowser');

const config = require('./config');
const constants = require('./constants');
const styleRules = require('./rules/styleRules');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const plugins = require('./plugins');
const { assetsPath, wrapperEnv } = require('./utils');
const { createProxy } = require('./proxy');
require('./cleanup-folder');
const env = wrapperEnv(process.env.APP_ENV);
const conf = {
  mode: process.env.NODE_ENV,
  entry: { app: ['./src/index.tsx'] },
  output: {
    path: config.assetsRoot,
    filename:
      constants.NODE_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[contenthash].js'),
    chunkFilename:
      constants.NODE_ENV === 'development'
        ? '[name].js'
        : assetsPath('js/[name].[id].[contenthash].js'),
    publicPath: config.assetsPublicPath,
    pathinfo: false,
  },
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    //name: '', // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
  },
  resolve: {
    extensions: constants.FILE_EXTENSIONS,
    alias: config.alias,
  },
  module: {
    rules: [...styleRules, ...jsRules, ...fileRules],
  },
  plugins,
  stats: 'minimal',
  target: 'web',
  devtool: config.sourceMap,
};

if (process.env.NODE_ENV === 'development') {
  conf.devServer = {
    // 不显示模块信息
    stats: 'errors-warnings',
    port: env.REACT_PORT,
    hot: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    after: function () {
      openBrowser(`http://localhost:${env.REACT_PORT}`);
    },
    proxy: createProxy(JSON.parse(env.REACT_PROXY)),
  };
}

module.exports = conf;
