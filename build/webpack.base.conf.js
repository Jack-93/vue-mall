'use strict'
const path = require('path')
const Webpack = require('webpack');
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        core: ['vue', 'vue-router','vuex'],
        app: ['./node_modules/babel-polyfill/dist/polyfill.min.js', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                }
            }] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=js', // 增加新的HappyPack构建loader
                include: [resolve('src'), resolve('test')]
            },
            /*{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            names: [
                'core',
            ],
            filename: 'static/js/[name].js',
            minChunks: 2
        }),
        new CopyWebpackPlugin([
            {from: 'src/vendor', to: 'static/vendor'},
        ])
    ],
}
