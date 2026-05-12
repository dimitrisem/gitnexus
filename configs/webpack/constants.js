
const customPaths = {
  src:    '../../src',
  dist:   '../../dist',
  public: '../../public',
};

const CSSLoader = {
  loader:  'css-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = {
  customPaths,
  CSSLoader,
};
