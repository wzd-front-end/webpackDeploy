const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    // 有两个值可以选择，development 和 production ，主要区别是，前者为开发环境，不使用压缩，且使用eval()执行，后者为生存环境，使用压缩减小文件大小
    mode: 'development',
    // source-map 是一个映射关系，它知道dist目录下main.js文件实际上对应的是src目录下index.js文件中的具体一行
    // inline 会把映射关系source-map变成base64格式放在打包后文件底部
    // cheap  报错只告诉你哪一行出错了，不精确到那一列，提升打包性能，用了cheap后source-map只针对业务代码，不管其他第三方的模块
    // module 不仅管业务代码的错误，还管其他第三方模块的一些错误，映射错误所在位置
    // eval 是通过eval来生成source-map的对应关系的，打包速度最快，性能最好，比较复杂的情况可能提示信息不全面
    // production 配置 cheap-module-source-map
    devtool: "cheap-module-eval-source-map",
    // 运行一个服务器，这样我们才可以使用ajax,因为ajax是要求http协议的
    devServer: {
        // 配置devserver获取资源的路径，即访问打包后文件
        contentBase: './dist',
        // 运行时自动打开浏览器
        open: true,
        // 设置访问端口号
        port: 8080,
        // 开启hot-module-replacement
        hot: true
        // 就算不自动刷新浏览器也不刷新
        // hotOnly: true
        // 代理
        // 如果需要代理多个地址，可将对象改为对象数组，并在每个对象中增加context数组，如下
        // proxy: [{
        //   context: ["/auth", "/api"],
        //   target: "http://localhost:3000",
        // }]

        // proxy: {
        //     "/api": {
        //         // 指定以/api开头的请求转向指定的地址请求
        //         target: 'http://localhost:3000',
        //         // 请求的路径中的/api替换为空，即'/api/test'会变成请求'/test'
        //         pathRewrite: {"^/api": ""},
        //         // 对于接受运行https请求，需要添加下面的字段
        //         secure: false,
        //         // 有时你不想代理所有请求，可以基于一个函数的返回值绕过代理
        //         // 如下，对于一个请求，你想要提供html页面，但对于api请求则保持代理，可以这么做
        //         bypass: function (req, res, proxyOptions) {
        //             if (req.headers.accept.indexOf("html") !== -1) {
        //                 return "/index.html"
        //             }
        //         }
        //     }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        // 有使用的导出才会被引入，删除多余的代码，在webpack4中，只要是production模式，都会自动开启Tree sharing
        usedExports: true
    }
}
module.exports = merge(commonConfig, devConfig)
