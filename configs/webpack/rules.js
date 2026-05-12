
const { CSSLoader } = require( './constants' );

const rules = [
  {
    test:    /\.(js|jsx)$/,
    exclude: /node_modules/,
    use:     [ 'babel-loader' ],
  },
  {
    test: /\.(ts|tsx)$/,
    use:  [
      {
        loader:  'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  },
  {
    test:    /\.(css|scss)$/,
    use:     [ 'style-loader', CSSLoader, 'sass-loader' ],
  },
  {
    test: /\.(jpe?g|png|gif|eot|webp|svg)?$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff(2)?|ttf|otf|eot|mp3|json)(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset/resource',
  },
];

module.exports = {
  rules,
};
