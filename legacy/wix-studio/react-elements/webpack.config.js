const path = require('path');
const fs = require('fs');

const entriesDir = path.resolve(__dirname, 'custom-elements');
const entries = {};

fs.readdirSync(entriesDir)
  .filter((f) => f.endsWith('.js'))
  .forEach((f) => {
    const name = path.basename(f, '.js');
    entries[name] = path.join(entriesDir, f);
  });

module.exports = {
  entry: entries,
  output: {
    // Velo only offers custom element sources from src/public/custom-elements, but
    // emitting there breaks `wix publish`: Wix lints every .js under src/, and the
    // minified React bundle trips no-undef on MSApp and __REACT_DEVTOOLS_GLOBAL_HOOK__.
    // Point this back at src/public/custom-elements only once the site is on a Premium
    // plan, which is what custom elements need in order to render at all.
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // IIFE is required for Wix custom elements; each bundle self-registers.
    iife: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions', 'safari >= 11'] } }],
              ['@babel/preset-react', { runtime: 'classic' }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Bundle React into each custom element so it runs standalone in Wix.
  externals: {},
};
