/* This Webpack provided for us to get absolute path directory no need to [ ./../..././.. etc] */
const path = require('path');
/* This is webpack plugin to minify file zise of js bundle included webpack v5 */
const TerserPlugin = require('terser-webpack-plugin');
/* Bundle css included in webpack v5 */
/* npm install --save-dev mini-css-extract-plugin < source : https://webpack.js.org/guides/asset-management/#loading-css > */
/* npm install --save-dev style-loader css-loader < source : https://webpack.js.org/plugins/mini-css-extract-plugin/> */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* Minifying css npm install css-minimizer-webpack-plugin --save-dev */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/* npm install --save-dev clean-webpack-plugin */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* npm install --save-dev html-webpack-plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  /* This where the js file get from? */
  entry : './src/js/script.js',
  /* This where the file goes after minified/uglified/compiled */
  output: {
      /* The file name of compiled JS */
      /* This approach will use for development hash js and css 'bundle.[contenthash].js' */
      /* It will give you the file having updated check the dist folder */
      filename: 'bundle.[contenthash].js',
      /* The directory where the compiled will released */
      path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),  
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  mode : 'production', /* none OR development OR production */ 
  module: {
    rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
          test: /\.scss$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
        }   

     ]
   },
   plugins : [
      new TerserPlugin(),
      new MiniCssExtractPlugin({
         /* This approach will use for development hash js and css 'style.[contenthash].css' */
         /* It will give you the file having updated check the dist folder */
         filename: 'style.[contenthash].css' 
      }),
      /* Minifying CSS */
      new MiniCssExtractPlugin(),
      /* This plugin will remove all old file from dist folder before create new bundle */
      new CleanWebpackPlugin(),
      /* This plugin will automatically update the hash css and js into index file
        style.45645481.css and build.461234164.js everytime when we run build or webpack */
      new HtmlWebpackPlugin(),
   ] 

};

/* THIS HOW RUN WEBPACK */
// npx webpack [ Enter ] 