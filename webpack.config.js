var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    watch: false,
    entry: {
        app: './app/app.js',
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
            query: {
                presets: ['latest'],
            },
        }],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
     ],
};

