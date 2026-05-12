
const { ProvidePlugin, HotModuleReplacementPlugin, DefinePlugin } = require( 'webpack' );
const TsconfigPathsPlugin = require( 'tsconfig-paths-webpack-plugin' );
const { rules } = require( './rules' );
const { customPaths } = require( './constants' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { resolve } = require( 'path' );

const commonConfig = {
  module: {
    rules,
  },
  resolve: {
    extensions: [  '.js', '.ts', '.tsx', '.css', '.scss' ],
    plugins:    [ new TsconfigPathsPlugin() ],
    fallback:   {
      'child_process': false,
      'fs':            false,
    }
  },
  plugins: [
    new DefinePlugin( {
      'process.env.AppPath': JSON.stringify( __dirname ),
    } ),
    new ProvidePlugin( {
      React:    'react',
      ReactDOM: 'react-dom'
    } ),
    new HtmlWebpackPlugin( {
      template: resolve( __dirname, `${customPaths.public}/index.html` ),
    } ),
    new HotModuleReplacementPlugin(),
  ],
  performance:  { hints: false },
  stats:        'minimal',
  target:       'web',
  optimization: {
 		minimize: true,
 		usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = commonConfig;
