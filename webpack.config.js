const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );


const webpackMode = process.env.NODE_ENV || 'development'

module.exports = {
  mode: webpackMode,
  entry: { 
    main: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' ),
    clean: true,
  },
  devServer: {
    compress: true,
    liveReload: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      title:"",
      template: "./index.html",
      filename: "index.html",
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    } ),
  ],
  devtool: 'inline-source-map',
  resolve: {
  }
};
