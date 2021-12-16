/*
 * @Author: zxy
 * @Date: 2021-05-04 15:19:57
 * @LastEditTime: 2021-11-23 20:30:00
 * @FilePath: /sku-blog-vite/src/assets/js/yome.js
 */
// 老婆
export const setYome = setTimeout(() => {
  window.L2Dwidget.init({
    pluginRootPath: '/live2dw/',
    pluginJsPath: 'lib/',
    pluginModelPath: 'live2d-widget-model-koharu/assets/',
    tagMode: false,
    debug: false,
    model: { jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
    display: { position: 'left', width: 250, height: 350 },
    mobile: { show: true },
    log: false
  })
}, 1000)
