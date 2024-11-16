/** @type {import('webpack').defaultConfig} */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const glob = require('glob');

/** @type {import('webpack').Configuration} */
const config = {
  ...defaultConfig,
  plugins: [...defaultConfig.plugins],
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = (env, argv) => {
  const dirDist = path.resolve(__dirname, 'assets/dist');
  const dirSrc = path.resolve(__dirname, 'assets/src');

  return {
    ...config,
    entry: {
      editorAssets: `${dirSrc}/editorAssets/index.ts`,
    },
    output: {
      path: dirDist,
      filename: '[name].js',
      publicPath: '/',
    },
  };
};
