const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devServer = {
    port: 3000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: "minimal",
    inline: true,
    compress: true,
    contentBase: "/"
};

module.exports = {
    entry: {
        polyfill: "@babel/polyfill",
        bundle: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: '/'
    },
    mode: "development",
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            api: path.resolve(__dirname, "api")
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: './public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new CopyPlugin([
            { from: "./public/robots.txt", to: "./robots.txt" },
            { from: "./public/manifest.json", to: "./manifest.json" }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                common: {
                    chunks: "all",
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    devServer
};
