var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'evil',
    //devtool: '#cheap-module-source-map',
    watch: false,
    entry: {
        app: './app/app.js',
        libs: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-form'],
    },
    output: {
        path: path.resolve('./static/js'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: path.resolve('./app'),
        }],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
            filename: 'libs.js',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
     ],
};

