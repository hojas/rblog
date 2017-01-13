const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
    const addPlugin = (add, plugin) => add ? plugin : undefined;
    const ifProd = plugin => addPlugin(env.prod, plugin);
    const removeEmpty = arr => arr.filter(i => !!i);

    return {
        entry: {
            app: './src/app/app.js',
            vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-form'],
        },
        output: {
            publicPath: '/js/',
            path: resolve(__dirname, 'static/js'),
            filename: '[name].js',
            chunkFilename: '[id].js',
            pathinfo: !env.prod,
        },
        devtool: env.prod ? 'source-map' : 'eval',
        bail: env.prod,
        performance: {
            hints: env.prod ? false : 'warning'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!sass-loader',
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                    loader: 'file-loader'
                }, {
                    test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]?[hash]'
                    }
                },
            ],
        },
        plugins: removeEmpty([
             new webpack.optimize.CommonsChunkPlugin({
                 names: ['vendor', 'manifest'],
             }),
             ifProd(new webpack.optimize.UglifyJsPlugin({
                 compress:{
                     warnings: true
                 }
             })),
             ifProd(new webpack.DefinePlugin({
                 'process.env':{
                     'NODE_ENV': JSON.stringify('production')
                 }
             })),
         ]),
    };
};

