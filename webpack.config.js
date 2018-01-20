const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname,

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:4040',
      'webpack/hot/only-dev-server',
      './src/main.js'
    ]
  },

  output: {
    path: resolve(__dirname, 'public'),
    filename: 'js/[name].js',
    publicPath: '/public/js/'
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [ 'style-loader', 'css-loader' ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('css/[name].css'),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      resolve(__dirname, 'src/'),
      resolve(__dirname, 'src/components/'),
      resolve(__dirname, 'node_modules/'),
    ]
  },

  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },

  devServer: {
    hot: true,
    port: 4040,
    publicPath: '/public/',
    historyApiFallback: true
  }
};

const appEntry = {
  app: './src/main.js'
};

if ( process.env.NODE_ENV === 'production' ) {
  config.entry = appEntry;
  config.devtool = false;
  config.plugins = [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('css/[name].css'),
  ];
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV==='server') {
  config.entry = appEntry;
}

module.exports = config;
