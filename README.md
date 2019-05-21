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
