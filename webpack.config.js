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
                test: /\.jpg$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
