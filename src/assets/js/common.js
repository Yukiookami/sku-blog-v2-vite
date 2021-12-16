/*
 * @Author: zxy
 * @Date: 2021-04-25 17:45:52
 * @LastEditTime: 2021-11-23 20:50:25
 * @FilePath: /sku-blog-vite/src/assets/js/common.js
 */
import router from "../../router"
import Base64 from './base64'
import { VueCookieNext } from 'vue-cookie-next'
import jwt_decode from "jwt-decode";
import store from "../../store";

// 判断上滑还是下滑
let checkScroll = 0
/**
 * 判断页面滚动方向
 */
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop
  let scroll = scrollTop - checkScroll
  checkScroll = scrollTop

  if (scroll < 0) {
    return 1
  } else {
    return 0
  }
}

/**
 * 跳转到文章页面，点击时触发
 *
 * @event
 * @param {string} routerUrl
 * @param {number} id
 */
const goToPage = ((routerUrl, id, type) => {
  if (id) {
    router.push({
      path: `/${routerUrl}`,
      query: {
        id: Base64.encode(id),
        type: Base64.encode(type)
      }
    })
  } else {
    router.push({
      path: `/${routerUrl}`
    })
  }
})

/**
 * 获取随机数
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
const getRan = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * @description: 登出
 * @param {string} keyName
 * @return {*}
 */
const loginOut = (keyName) => {
  VueCookieNext.removeCookie(keyName)

  goToPage('program')
}

/**
 * @description: 进入时看有没有头像，如果有直接换上
 * @param {*}
 * @return {sting}
 */
const getIcon = () => {
  let token = VueCookieNext.getCookie("login_SKU_cookies")

  if (token) {
    const decoded = jwt_decode(token)

    return decoded.avatar
  } else {
    return ''
  }
}

/**
 * @description: 节流
 * @param {function} fn
 * @param {numebr} gapTime
 * @return {function}
 */
const throttle = (fn, gapTime) => {
  let _lastTime = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}

/**
 * @description: 处理服务器时间戳
 * @param {string} time
 * @return {string}
 */
const timeChange = (time) => {
  let date = time.slice(0, 10)

  return date
}

/**
 * @description: 判断是否为PC端
 */
const isPC = () => {
  let system = {};
  var p = navigator.platform;
  var u = navigator.userAgent;
  let isPCFalg = false

  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

  for (let i in system) {
    if (system[i]) {
      isPCFalg = true
    } 
  }

  store.commit('setNowOs', isPCFalg)

  !isPCFalg && goToPage('notPc') 
}

/**
 * @description: 判断是否缩放
 * @param {*}
 * @return {*}
 */
 function detectZoom (){
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

   if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

   if (ratio){
    ratio = Math.round(ratio * 100);
  }

   return ratio;
};

export {
  handleScroll,
  goToPage,
  getRan,
  loginOut,
  getIcon,
  throttle,
  timeChange,
  isPC,
  detectZoom
}
