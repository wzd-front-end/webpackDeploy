const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
    mode: "production",
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                // css-loader分析出几个css文件之间的关系，最终把这些css文件合并成一段css文件
                // style-loader 在得到css-loader生成的内容之后，会把这段内容挂载到页面的style标签内
                // postcss-loader 主要作用是处理css前缀问题，兼容多浏览器
                // loader的执行顺序是从下到上，从右到左
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 用于在css/scss文件中引入css/scss文件的打包，这样在样式文件中引入的样式文件就得重新经过指定的往上的个数loader
                            modules: true //开启css样式模块化的开关，默认是全局作用域
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    // 忽略到默认的参数，比如前面设置那些
                    enforce: true
                }
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 直接被引用的是走filename
            filename: '[name].css',
            // 间接被引入的走chunkFilename
            chunkFilename: '[name].chunk.css'
        })
    ],
    output: {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, '../dist')
    }
}

module.exports = merge(commonConfig, prodConfig);
