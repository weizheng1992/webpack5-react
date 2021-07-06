const { resolve } = require('./../utils');

module.exports = [
  {
    test: /\.(j|t)sx?$/,
    include: [resolve('src')],
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              // https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json#L32
              {
                targets: { browsers: ['chrome >= 47'] },
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
    ],
  },
];
