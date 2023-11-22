const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const VERSION = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"))).version;

module.exports = {
    entry: [path.resolve(__dirname, "../src/index.js")],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    bugfixes: true,
                                    corejs: {
                                        version: "3.33",
                                        proposals: true,
                                    },
                                    modules: false,
                                    useBuiltIns: "usage",
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `Wikiplus - ${VERSION}`,
        }),
    ],
};
