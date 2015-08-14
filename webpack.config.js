/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
/* eslint-enable */

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: {
        app: './app/app.js',
        vendor: [
            'angular',
            'angular-storage',
            'angular-ui-bootstrap',
            'angular-ui-router',
            'lodash',
            'restangular',
        ],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'uglify!ng-annotate!babel' },
            { test: /\.less$/, loader: 'style!css!autoprefixer!less'},
            { test: /\.json$/, loader: 'json' },

            { test: /\.html$/, exclude: /node_modules/, loader: 'html!html-minify' },

            { test: /\.(ttf|eot|svg|otf)$/, loader: 'file' },
            { test: /\.woff(2)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            // $: 'jquery',
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ],
};
