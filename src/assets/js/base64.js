/*
 * @Author: zxy
 * @Date: 2021-06-06 15:19:36
 * @LastEditTime: 2021-11-23 20:27:12
 * @FilePath: /sku-blog-vite/src/assets/js/base64.js
 */
const Base64 = {
  //加密
  encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(+('0x' + p1))
      }))
  },
  //解密
  decode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
export default Base64
