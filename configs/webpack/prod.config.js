
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { customPaths } = require('./constants');
const commonConfig = require('./common.config');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const prodConfig = merge(commonConfig, {
  entry: resolve(__dirname, `${customPaths.src}/index.tsx`),
  mode: 'production',
  output: {
    crossOriginLoading: 'anonymous',
    filename: 'js/[name].[contenthash].bundle.min.js', // Ensure unique filenames
    path: resolve(__dirname, `${customPaths.dist}`),
    clean: true,
  },
  optimization: {
    minimize: true,
  },
	plugins: [
		new TerserPlugin({
			test: /\.(ts|tsx|js|jsx)(\?.*)?$/i,
			include: resolve(__dirname, `${customPaths.src}`),
			exclude: /node_modules/,
			terserOptions: {
				parse: {},
				compress: {
					warnings: false,
					drop_console: true,
					drop_debugger: true,
				},
				format: {
					comments: false,
				},
				module: true,
			},
			extractComments: false,
		}),
		new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          'cp .htaccess dist/.htaccess',
					'cp _redirects dist/_redirects',
					'echo "Build finished!"',
        ],
        blocking: false,
        parallel: true,
      },
    }),
	]
});

module.exports = prodConfig;
