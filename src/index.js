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

const arr = [
    new Promise(() => {}),
    new Promise(() => {})
];

arr.map(item => {
    console.log(item);
})