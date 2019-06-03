const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    // 配置入口文件，前面的为名称，在打包输出的时候，可以根据名称生成对应名称的打包后输出文件
    entry: {
        "main": './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 使用占位符,确定打包后名称
                        name: '[name]_[hash].[ext]',
                        // 确定打包后输出文件所在的文件夹
                        outputPath: 'font/'
                        // 临界值，确定是打包成文件还是base64字符串
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    // file-loader 和url-loader的区别主要能转化成base64字符串
                    loader: "url-loader",
                    options: {
                        // 使用占位符,确定打包后名称
                        name: '[name]_[hash].[ext]',
                        // 确定打包后输出文件所在的文件夹
                        outputPath: 'images/',
                        // 临界值，确定是打包成文件还是base64字符串
                        limit: 2048
                    }
                }
            },
            {
                test: /\.scss$/,
                // css-loader分析出几个css文件之间的关系，最终把这些css文件合并成一段css文件
                // style-loader 在得到css-loader生成的内容之后，会把这段内容挂载到页面的style标签内
                // postcss-loader 主要作用是处理css前缀问题，兼容多浏览器
                // loader的执行顺序是从下到上，从右到左
                use: [
                    'style-loader',
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
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 只是babel 和 webpack进行通讯的桥梁，实际上不会将es6转化为es5，还需要另外的模块来辅助它，比如@babel/preset-env,它包含了es6转化为es5的规则
                loader: 'babel-loader'
                // 配置项写在这里会显得很乱，我们可以把对应的配置抽出写到.babelrc文件
                // options: {
                // preset-env 是做语法转换的，有一些变量和函数还是缺失的，需要babel-polyfill来补充低版本的兼容性
                // 使用上下两种转换方式，主要区别在于，presets方式主要是用于业务逻辑代码的打包，plugins主要是用于组件库或者类库的打包
                // 使用plugins 相对于presets可以有效的避免全局污染，它会以闭包的形式注入或间接的帮助组件去引入
                // presets中的执行顺序是从下往上，从右到左

                // presets: [
                //     [
                //         '@babel/preset-env',
                //         {
                //             targets: {
                //                 edge: '17',
                //                 firefox: '60',
                //                 chrome: '67',
                //                 safari: '11.1'
                //             },
                //             // 加上这句，在使用@babel/polyfill的时候，只有被使用的函数或变量会引入对应的垫片，减小对应的文件的大小，
                //             // 实际上，我们使用了useBuiltIns会自动引入polyfill，不需要再次在业务逻辑引入，且，corejs是polyfill的核心代码库
                //             useBuiltIns: 'usage',
                //             corejs: 2
                //         }
                //     ]
                // ]
                // plugins: [
                //     [
                //         '@babel/plugin-transform-runtime',
                //         {
                //              // 配置后，当页面中使用一些不存在的方法或对象的时候，才会把对应的打包进去
                //              "corejs": 2,
                //              "helpers": true,
                //              "regenerator": true,
                //              "useESModules": false
                //         }
                //     ]
                // ]
                // }
            }
        ]
    },
    // plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情，道理类似生命周期，执行顺序是从下到上，从右到左
    // HtmlWebpackPlugin 会在打包结束后自动生成一个html文件，并把打包生成的js自动引入到html中
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../dist')
    }
}
