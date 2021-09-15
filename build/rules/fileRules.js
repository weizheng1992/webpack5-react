const imageInlineSizeLimit = 4 * 1024;
module.exports = [
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: imageInlineSizeLimit, // 4kb
      },
    },
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2?)$/,
    type: 'asset/resource',
  },
];
