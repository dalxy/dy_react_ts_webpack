const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
module.exports = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development", //默认是开发模块
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    devServer: {
        hot: true, //热更新插件
        static: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 80,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
        extensions: [".js", ".tsx", ".ts", ".json"],
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: {
                    loader: "babel-loader",
                    options: {
                        // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { importLoaders: 0 },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ["url-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        //热更新插件
        // new webpack.HotModuleReplacementPlugin(),
    ],
};
