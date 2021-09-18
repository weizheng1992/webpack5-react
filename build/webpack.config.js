const TerserPlugin = require('terser-webpack-plugin');
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
    // buildDependencies: {
    //   config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    // },
    //name: '', // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
  },
  resolve: {
    extensions: constants.FILE_EXTENSIONS,
    alias: config.alias,
    modules: ['node_modules', config.assetSrc],
  },
  module: {
    rules: [...styleRules, ...jsRules, ...fileRules],
  },
  plugins,
  stats: 'minimal',
  target: 'web',
  devtool: config.sourceMap,
};
if (process.env.NODE_ENV !== 'development') {
  conf.optimization = {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        extractComments: true,
        include: './src',
      }),
    ],
    usedExports: true,
    sideEffects: false,
  };
}

if (process.env.NODE_ENV === 'development') {
  conf.devServer = {
    port: env.WX_PORT,
    hot: true,
    compress: true,
    client: {
      progress: true,
    },
    open: true,
    proxy: createProxy(JSON.parse(env.WX_PROXY)),
  };
}

module.exports = conf;
