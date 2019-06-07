// function getComponent() {
//     return import(/* webpackChunkName: 'lodash ' */'lodash').then(({default: _}) => {
//         var element = document.createElement('div')
//         element.innerHtml = _.join(['dell', 'lee'], '-')
//         return element
//     })
// }
// document.getElementById("root").onclick=function () {
//     console.log("执行异步请求")
//     getComponent().then(element => {
//         document.body.appendChild(element)
//     })
// }



import {join} from 'lodash'
console.log(join(['a', 'b', 'c'], '****'))


// import React, {Component} from 'react'
// import ReactDom from 'react-dom'
//
// class App extends Component {
//     render() {
//         return <div>Hello World</div>
//     }
// }
//
// ReactDom.render(<App/>, document.getElementById('root'))


// import avatar from './avatar.jpg'
// import style from './style.scss'
//
// var img = new Image()
// img.src = avatar

// var root = document.getElementById('root')
// root.append(img)
// console.log('测试')
// var test = document.getElementById('test')
// test.classList.add(style.iconfont)
// test.classList.add(style.iconfavorate)

// 这中方式仅仅使用也业务逻辑的开发打包，对于组件库或者内库，需要换种方式打包,防止污染全局变量
// import '@babel/polyfill'

// const arr = [
//     new Promise(() => {}),
//     new Promise(() => {})
// ];
//
// arr.map(item => {
//     console.log(item);
// })

//
// import './styles.css'
//
// var btn =  document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)
//
// btn.onclick = function () {
//     var div = document.createElement('div')
//     div.innerHTML = 'item'
//     document.body.appendChild(div)
// }


// 如果支持module.hot
// if (module.hot) {
//     // 如果文件number发生了改变， 执行后面的函数
//     module.hot.accept('./number', () => {
//
//     })
// }
