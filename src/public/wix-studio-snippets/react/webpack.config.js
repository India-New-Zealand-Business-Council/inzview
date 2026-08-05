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
