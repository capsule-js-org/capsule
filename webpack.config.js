const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
module.exports = {
    context: __dirname,
    entry: path.join(__dirname, "src", "capsule.js"),
    devtool: 'source-map',
    output: {
        path: "./dist/",
        filename: "capsule.js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    "presets": [
                        ["es2015", {"loose": true}],
                        "stage-1"
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ]
};
