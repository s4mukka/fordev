const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        publicPath: './dist',
        writeToDisk: true,
        historyApiFallback: true,
        open: true,
        port: 8080
    },
    plugins: [
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api')
        }),
        new HtmlWebpackPlugin({
            template: './template.dev.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './public/favicon.png'
        })
    ]
})
