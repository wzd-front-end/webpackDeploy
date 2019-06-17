# webpackDeploy
npm init -y 加上-y后，自动生成默认配置，不会再询问
npm info '包名' 可以查看某个包的详细情况，包括但不限于版本号

package.json中"main": "index.js", 教程上去掉，因为是自己使用，不是给外部使用，
这个设置是给外部暴露一个文件，供外部使用者调用，可联想到跟框架设置有关

webpack --config webpack.config.js 可用于修改webpack默认的打包配置文件

global

webpack index.js

local

npx webpack index.js

npm scripts

npm run bundle

安装webpack-cli 这个包，是为了让我们在命令行工具中正确使用webpack这个命令，不然我们再命令行工具中使用webpack命令的时候，会报错

###**优化webpack打包速度的方法**
1、使用最新的node，npm，yarn

2、在尽可能少的模块上使用loader

3、Plugin尽可能精简并确保可靠（推荐使用官方插件，安全性和性能比较有保障）

4、resolve参数合理配置（）
增加resolve: {extensions: ['.js', '.jsx'], mainFiles: ['index', 'child'], alias: {}}，那么我们在引入一个模块，但我们没有增加后缀的时候，会先去.js后缀的查找，再到.jsx中查询；
但我们不能过多配置，不然逐个查询会导致查找文件时间过长，性能损耗，导致打包时间过长，优化方案是文件自带后缀，减少查询，建议只配置.js，同理，mainFiles配置路径下的默认读文件,alias的主要作用是配置别名


5、使用DIPlugin提高打包速度 
