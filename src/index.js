import avatar from './avatar.jpg'
import style from './style.scss'

var img = new Image()
img.src = avatar

// var root = document.getElementById('root')
// root.append(img)

var test = document.getElementById('test')
test.classList.add(style.iconfont)
test.classList.add(style.iconfavorate)
