'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractCSSPlugin = require('extract-css-chunks-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const argv = JSON.parse(process.env.npm_config_argv);
const isDev = argv.original.indexOf('build') === -1;

const config = {
    mode: isDev ? 'development' : 'production',
    entry: {
        app: [ 'babel-polyfill', './app/index.js' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ibis.[name].[hash].js',
        publicPath: isDev ? '/ibis/cms/bo/dist/' : '/'
    },
    devtool: isDev ? "cheap-module-eval-source-map" : "none",
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'app')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'node_modules/css-reset-and-normalize-sass/scss/flavored-reset-and-normalize.scss'),
                    path.resolve(__dirname, 'app'),
                ],
               
                use: [
                    ExtractCSSPlugin.loader,
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: !isDev
                        }
                    },
                    {
                        loader:  'sass-loader',
                        options: {
                            sourceMap: !isDev
                        }
                    }
                ]
            
            },
            {
                test: /\.css$/,
                use: [  ExtractCSSPlugin.loader,
                        {
                            loader:  'css-loader',
                            options: {
                                sourceMap: !isDev
                            }
                        }
                    ]
            },
            {
                test: /\.(json|png|jpg|jpeg|gif|svg|ttf|eot|woff|woff2|otf)$/,
                include: [
                    path.resolve(__dirname, 'app'),
                    path.resolve(__dirname, 'node_modules/react-toastify'),
                ],
                loader: 'file-loader'
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['./dist/*.js', './dist/*.css', './dist/index.html'], { watch: true }),
        new ExtractCSSPlugin({
            filename: "ibis.[name].[hash].css"
            
        }),
        new HtmlWebpackPlugin({
            template: './assets/files/templates/index.ejs'
        }),
        new CopyWebpackPlugin(['./assets/files/copy']),
        new webpack.ProvidePlugin({
            'window.Quill': 'quill'
          })
        ]
        
    };

    
    if (!isDev) {
          config.plugins = [ new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
        ].concat(config.plugins || []);
    }

    module.exports = config;