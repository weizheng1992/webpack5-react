const path = require('path');
const dotenv = require('dotenv');

const config = require('./config');

exports.assetsPath = function (_path) {
  return path.posix.join(config.assetsSubDirectory, _path);
};

exports.resolve = function (dir) {
  return path.join(__dirname, './../', dir);
};

exports.processEnv = function (envConf = 'dev') {
  const env = dotenv.config({ path: '.env.' + envConf });
  const envConfig = env.parsed;
  const oriEnv = {};
  Object.assign(oriEnv, {
    APP_ENV: envConf,
    ...envConfig,
  });
  const defineEnv = {};
  for (const key in oriEnv) {
    defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key]);
  }
  return defineEnv;
};

exports.wrapperEnv = function (envConf = 'dev') {
  const env = dotenv.config({ path: '.env.' + envConf });
  const envConfig = env.parsed;
  const oriEnv = {};
  Object.assign(oriEnv, {
    APP_ENV: envConf,
    ...envConfig,
  });
  return oriEnv;
};
