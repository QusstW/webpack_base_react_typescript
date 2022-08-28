const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpuckPlugin = require("html-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") mode = "production";

module.exports = {
  mode,
  entry: ['@babel/polyfill', './src/index.tsx'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[hash].js',
    clean: true
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpuckPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.m?jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

