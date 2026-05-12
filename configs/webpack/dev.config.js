
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./common.config');
const { customPaths } = require('./constants');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const devConfig = merge(commonConfig, {
  entry: {
    main: [
      // activate HMR for React
      'react-hot-loader',
      // bundle the client for webpack-dev-server and connect to the provided endpoint
      'webpack-dev-server/client',
      // bundle the client for hot reloading, only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',
      resolve(__dirname, `${customPaths.src}/index.tsx`),
    ],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: resolve(__dirname, customPaths.public)
    },
    historyApiFallback: true,
    port: 8080,
    hot: true,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, customPaths.dist),
    publicPath: '/'
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
    errorDetails: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ErrorOverlayPlugin(),
  ],
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
    },
  },
});

module.exports = devConfig;
