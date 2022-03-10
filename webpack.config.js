const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = [
    {
        mode: 'development',
        entry: './src/electron.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'electron.js'
        }
    },
    {
        mode: 'development',
        entry: './src/app.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    include: /src/,
                    use: [{ loader: 'ts-loader' }]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                            }
                        },
                    ]
                }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'react.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ],
        resolve: {
            extensions: ['.jsx', '.ts', '.tsx', '...']
        },
    }
]
