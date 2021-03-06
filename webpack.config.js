const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./source/js/front/index.js','./source/scss/base.scss'],
    output: {
        path: __dirname + '/public_html',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'style.css',
                            outputPath: '/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [path.join(__dirname, 'source'), 'node_modules']
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/app': 'http://localhost:9193'
        },
        contentBase: path.join(__dirname, 'public_html'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },
    plugins: [
        // new ExtractTextPlugin('style.css')
    ],
    devtool:'none'

};
