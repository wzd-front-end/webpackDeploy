const path = require('path')

module.exports = {
    // 有两个值可以选择，development 和 production ，主要区别是，前者为开发环境，不使用压缩，且使用eval()执行，后者为生存环境，使用压缩减小文件大小
    mode: 'development',
    // 配置入口文件，前面的为名称，在打包输出的时候，可以根据名称生成对应名称的打包后输出文件
    entry: {
        "main": './src/index.js'
    },
    // 模块处理配置，可以根据模块名称的不同配置不同的正则表达式，使用对应的loader来处理对应文件资源
    module: {
        rules: [
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
            }, {
                test: /\.scss$/,
                // css-loader分析出几个css文件之间的关系，最终把这些css文件合并成一段css文件
                // style-loader 在得到css-loader生成的内容之后，会把这段内容挂载到页面的style标签内
                // postcss-loader 主要作用是处理css前缀问题，兼容多浏览器
                // loader的执行顺序是从下到上，从右到左
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
