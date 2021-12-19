<template>
  <div class="main-banner-sec">
    <div class="banner-sec" v-show="loadOverList.length === layerList.length">
      <!-- 图片群 -->
      <image-box v-for="layer1 in layerList" :key="layer1.url" :url="layer1.url" :scale="layer1.scale" :tranX="layer1.nowTranX"
      :tranY="layer1.nowTranY" :rot="layer1.rot" :opacity="layer1.nowOpacity"
      :width="layer1.width" :height="layer1.height"
      :nowWidth="layer1.nowWidth" :nowHeight="layer1.nowHeight"
      :blur="layer1.blur"
      @loadOver="loadOver"></image-box>
    </div>
    <canvas id="canvas" height="180" :width="viewWidth"
    @mousemove="getMouseMove" @mouseenter="getFirstPoint" @mouseleave="clearFirstPoint"
    class="banner-canvas"></canvas>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import imageBox from '../2021-haru/imageBox.vue'
  import {makeCanvas} from '../../../assets/js/canvas'

  // todo 如果SSR 这里需要修改
  export default {
    setup () {
      const state = reactive({
        // 鼠标初始点位
        firstPoint: 0,
        // 视窗宽度
        viewWidth: 1920,
        // 图片群数组
        layerList: [
          // 背景天空参数
          {
            url: new URL('../../../assets/img/banner-image/banner-top.png', import.meta.url).href,
            scale: 1,
            tranX: 0,
            tranY: -17.4,
            rot: 0,
            opacity: 1,
            width: 9666,
            height: 360,
            nowWidth: 5612,
            nowHeight: 209,
            nowTranX: 0,
            nowTranY: -17.4,
            changePro: 0.01,
            nowOpacity: 1
          },
          // 背景河，亭子
          {
            url: new URL('../../../assets/img/banner-image/banner-bottom.png', import.meta.url).href,
            scale: 1,
            tranX: 1277.42,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 9666,
            height: 360,
            nowWidth: 5612,
            nowHeight: 209,
            nowTranX: 1277.42,
            nowTranY: 0,
            changePro: 0.01,
            nowOpacity: 1
          },
          // 背景森林
          {
            url: new URL('../../../assets/img/banner-image/mori.png', import.meta.url).href,
            scale: 1,
            tranX: 783.9,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 3523,
            height: 360,
            nowWidth: 1841,
            nowHeight: 188,
            nowTranX: 783.9,
            nowTranY: 0,
            changePro: 0.03,
            nowOpacity: 1
          },
          // 桥
          {
            url: new URL('../../../assets/img/banner-image/hashi.png', import.meta.url).href,
            scale: 1,
            tranX: -739.7,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 2938,
            height: 360,
            nowWidth: 1617,
            nowHeight: 209,
            nowTranX: -739.7,
            nowTranY: 0,
            changePro: 0.11,
            nowOpacity: 1
          },
          // 船
          {
            url: new URL('../../../assets/img/banner-image/hito-fune.png', import.meta.url).href,
            scale: 1,
            tranX: 705.484,
            tranY: 52.25,
            rot: 0,
            opacity: 1,
            width: 556,
            height: 139,
            nowWidth: 290,
            nowHeight: 72,
            nowTranX: 705.484,
            nowTranY: 52.25,
            changePro: 0.1,
            nowOpacity: 1
          },
          // 2233船，右边
          {
            url: new URL('../../../assets/img/banner-image/2233-fune.png', import.meta.url).href,
            scale: 1,
            tranX: 705.484,
            tranY: 52.25,
            rot: 0,
            opacity: 0,
            width: 556,
            height: 139,
            nowWidth: 238,
            nowHeight: 98,
            nowTranX: 705.484,
            nowTranY: 52.25,
            changePro: 0.25,
            nowOpacity: 0,
            flag: 1
          },
          // 草地樱花树 右（背景）
          {
            url: new URL('../../../assets/img/banner-image/kusachi-right.png', import.meta.url).href,
            scale: 1,
            tranX: 130,
            tranY: 16.25,
            rot: 0,
            opacity: 1,
            width: 1757,
            height: 180,
            nowWidth: 1428,
            nowHeight: 146,
            nowTranX: 130,
            nowTranY: 16.25,
            changePro: 0.5,
            nowOpacity: 1
          },
          // 草地 左（背景）
          {
            url: new URL('../../../assets/img/banner-image/kusachi.png', import.meta.url).href,
            scale: 1,
            tranX: -406.452,
            tranY: 56.9,
            rot: 0,
            opacity: 1,
            width: 1757,
            height: 116,
            nowWidth: 1428,
            nowHeight: 94,
            nowTranX: -406.452,
            nowTranY: 56.9,
            changePro: 0.5,
            nowOpacity: 1
          },
          // 风筝22
          {
            url: new URL('../../../assets/img/banner-image/22-run.png', import.meta.url).href,
            scale: 1,
            tranX: -278.71,
            tranY: 18.58,
            rot: 0,
            opacity: 0,
            width: 497,
            height: 346,
            nowWidth: 230,
            nowHeight: 160,
            nowTranX: -278.71,
            nowTranY: 18.58,
            changePro: 0.2,
            nowOpacity: 0,
            flag: 2
          },
          // 风筝33
          {
            url: new URL('../../../assets/img/banner-image/33-run.png', import.meta.url).href,
            scale: 1,
            tranX: -394.8,
            tranY: 37.16,
            rot: 0,
            opacity: 0,
            width: 146,
            height: 256,
            nowWidth: 67,
            nowHeight: 118,
            nowTranX: -394.8,
            nowTranY: 37.16,
            changePro: 0.4,
            nowOpacity: 0,
            flag: 2
          },
          // 樱花树（远）
          {
            url: new URL('../../../assets/img/banner-image/sakura-ki-tooi.png', import.meta.url).href,
            scale: 1,
            tranX: -104.5,
            tranY: 15.67,
            rot: 0,
            opacity: 1,
            width: 602,
            height: 254,
            nowWidth: 314,
            nowHeight: 132,
            nowTranX: -104.5,
            nowTranY: 15.67,
            changePro: 1,
            nowOpacity: 1
          },
          // 樱花，前景
          {
            url: new URL('../../../assets/img/banner-image/haikei.png', import.meta.url).href,
            scale: 1,
            tranX: 116.129,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 4277,
            height: 360,
            nowWidth: 2483,
            nowHeight: 209,
            nowTranX: 116.129,
            nowTranY: 0,
            changePro: 1,
            nowOpacity: 1
          },
          // 2233
          {
            url: new URL('../../../assets/img/banner-image/2233-BBQ.png', import.meta.url).href,
            scale: 1,
            tranX: 250.839,
            tranY: 15.67,
            rot: 0,
            opacity: 1,
            width: 933,
            height: 327,
            nowWidth: 487,
            nowHeight: 170,
            nowTranX: 250.839,
            nowTranY: 15.67,
            changePro: 1,
            nowOpacity: 1,
            flag: 3
          },
          // 柳
          {
            url: new URL('../../../assets/img/banner-image/yanagi.png', import.meta.url).href,
            scale: 1,
            tranX: 2438.71,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 740,
            height: 353,
            nowWidth: 515,
            nowHeight: 245,
            nowTranX: 2438.71,
            nowTranY: 0,
            changePro: 1.5,
            blur: 2,
            nowOpacity: 1
          },
          // 樱花（大）
          {
            url: new URL('../../../assets/img/banner-image/sakura-ki.png', import.meta.url).href,
            scale: 1,
            tranX: -1161.29,
            tranY: 0,
            rot: 0,
            opacity: 1,
            width: 1916,
            height: 360,
            nowWidth: 1112,
            nowHeight: 209,
            nowTranX: -1161.29,
            nowTranY: 0,
            changePro: 1.5,
            blur: 1,
            flag: 4,
            nowOpacity: 1
          }
        ],
        /**
         * @param {Object} event
         * @description 获取鼠标初始点位
         */
        getFirstPoint (event) {
          state.firstPoint = event.clientX
        },
        /**
         * 鼠标离开时触发
         * @event
         * @description 重制初始点位
         */
        clearFirstPoint () {
          state.firstPoint = 0
          state.layerList.forEach(ele => {
            ele.nowTranX = ele.tranX
            ele.nowOpacity = ele.opacity
          })
        },
        /**
         * @param {Object} event
         * @description 计算偏移量
         */
        getMouseMove (event) {
          let moveX = event.clientX - state.firstPoint
          state.changeImageTran (moveX, state.layerList)
        },
        /**
         * @param {Number} moveX 偏移量
         * @param {Array} layerList 图片数组
         * @description 为图片施加偏移量
         */
        changeImageTran (moveX, layerList) {
          // 图片偏移
          layerList.forEach((ele) => {
            ele.nowTranX = ele.tranX - moveX * ele.changePro

            // 更改人物透明度
            if (ele.flag === 1) {
              // 2233 船
              ele.nowOpacity = (ele.tranX + moveX) / 1400
            } else if (ele.flag === 2) {
              ele.nowOpacity = (ele.tranX + moveX) / -1600
            } else if (ele.flag === 3) {
              if (moveX > 300) {
                ele.nowOpacity = (2000 - moveX) / 2000
              }
            }
          })
        },
        // 加载完成的图片
        loadOverList: [],
        /**
         * @description: 图片加载完成
         * @param {*}
         * @return {*}
         */        
        loadOver () {
          state.loadOverList.push('loadOver')
        }
      })

      onMounted(() => {
        state.viewWidth = document.documentElement.offsetWidth
         makeCanvas()
      })

      return {
        ...toRefs(state)
      }
    },
    components: {
      imageBox
    }
  }
</script>

<style lang="scss" scoped>
  // banner总区域
  .main-banner-sec {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin: 0 auto;
    padding: 0;
    // min-height: 155px;
    // height: 9.375vw;
    height: 180px;
    min-width: 999px;
    background-color: #f9f9f9;
    background-image: url('../../../assets/img/banner-image/allBanner.png');
    background-size: 100%;
    background-position: center;
    user-select: none;

    // 图片
    .banner-layer {
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        min-width: 4833px;
        max-width: 9966px;
        min-height: 180px;
        max-height: 360px;
      }
    }

    // canvas
    .banner-canvas {
      position: absolute;
      top: 0;
      height: 180px;
      width: calc(100vw - 3px);
    }
  }
</style>
