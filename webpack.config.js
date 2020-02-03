const path = require("path");

module.exports = {
    entry: "./js/entry.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js"]
    },
    devtool: 'source-map',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader?name=/assets/[name].[ext]',
                    },
                ],

            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader?name=/assets/[name].[ext]',
                    options: {}
                }
            }
        ],
    },
};