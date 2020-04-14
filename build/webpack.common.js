
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// imports-loader 可以配置模块内this指向

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
                //              // 配置后，当页面中使用一些不存在的方法或对象的时候，才会把对应的打包进去,plugin-transform-runtime 已经默认包括了 @babel/polyfill，因此不用在独立引入。
                //              // 如果你的全局有一个引入，不要让引入的库影响全局，那你就需要引把 corejs 设置成 2
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
        new CleanWebpackPlugin(),
        // 配置该项后，可以在遇到$的时候自动调用jquery,而不用我们手动去引入，是一种模块内自动引入的方式
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //    // 代表着_join是lodash下面的join
        //     _join: ['lodash', 'join']
        // })
    ],
    // 配置该值后，代码会实现代码分割的功能，包括同步和异步的，异步的需要增加一个@babel/plugin-syntax-dynamic-import插件，
    // 配置到.babelrc中
    optimization: {
        // 配置后，打包后会生成mainfest，是包与包之间的关系，webpack4之前需要这样配置，才不会因为每次打包生成的mainfest不用而导致hash值发生改变，这么是优化缓存
        // 配置后会把mainfest抽出一个单独的文件，这样就不会影响其他文件
        // runtimeChunk: {
        //      name: 'runtime'
        // },

        // 有使用的导出才会被引入，删除多余的代码，在webpack4中，只要是production模式，都会自动开启Tree sharing
        usedExports: true,
        splitChunks: {
            // 对哪一些代码进行分割，配置值包括'all', 'asynx', 'initial',同步的进行代码分割，还需要配置cacheGroups
            chunks: "all",
            // 配置代码分割的最小文件大小
            minSize: 30000,
            // // 配置后，如果打包后的文件大小超过该值，则会尝试把打包后的文件进行二次拆分，但不一样可以再次进行代码分割
            // maxSize: 0,
            // 当一个模块被用了至少多少次的时候，才对它进行代码分割
            minChunks: 1,
            // 异步加载的模块数的最大值，大于该值，不会在帮你进行代码分割
            maxAsyncRequests: 5,
            // 同步加载的模块数的最大值，大于该值，不会在帮你进行代码分割
            maxInitialRequests: 3,
            // cacheGroups和文件之间的连接符，如例子是main~vendors
            automaticNameDelimiter: '~',
            // 让cacheGroups打包后的文件名有效
            name: true,
            // 打包同步代码不仅仅会走chunks配置项，还会走cacheGroups配置项
            cacheGroups: {
                // 指定打包后的模块配置
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 权值，值越大，优先级越高，指定打包后所走的文件打包路径
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    // 如果一个模块被打包过了，再打包的时候就忽略这个模块，直接使用之前被打包的模块即可
                    reuseExistingChunk: true
                }
            }
        }
    }
}
