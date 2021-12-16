<template>
  <div @mousemove="getMouseMove" @mouseenter="getFirstPoint" @mouseleave="clearFirstPoint" class="banner-natu-box">
    <video height="180" width="2200" autoplay loop
    muted @canplaythrough="showVideo" class="hide-you"
    :class="{'is-load': idLoad}"
    :style="`transform: translate(${tranX}px, ${tranY}px);`"
    :src="videoSrc"></video>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { getRan } from '../../../assets/js/common'

export default {
  setup () {
    const state = reactive({
      tranX: 0,
      tranY: 0,
      // 鼠标初始点位
      firstPoint: 0,
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
        state.tranX = 0
        state.tranY = 0
      },
      /**
       * @param {Object} event
       * @description 计算偏移量
       */
      getMouseMove (event) {
        let moveX = event.clientX - state.firstPoint
        state.tranX = state.tranX - moveX * 0.0003
      },
      videoSrc: '',
      idLoad: false,
      /**
       * 判断当前时间，替换banner
       */
      getVideo: () => {
        const nowDate = new Date()
        let nowHour = nowDate.getHours()
        // let nowHour = 20
        let ran = getRan(1, 3)

        if (nowHour >= 6 && nowHour <= 16) {
          // todo 如果以后采用了SSR 这里需要修改
          state.videoSrc = new URL(`../../../assets/video/natu-banner/day/day-${ran}.webm`, import.meta.url).href
        } else if (nowHour > 16 && nowHour < 19) {
          // todo 如果以后采用了SSR 这里需要修改
          state.videoSrc = new URL(`../../../assets/video/natu-banner/tasogare/tasogare-${ran}.webm`, import.meta.url).href
        } else {
          // todo 如果以后采用了SSR 这里需要修改
          state.videoSrc = new URL(`../../../assets/video/natu-banner/yoru/yoru-${ran}.webm`, import.meta.url).href
        }
      },
      /**
       * 显示视频，加载结束触发
       *
       * @event
       */
      showVideo: () => {
        state.idLoad = true
      }
    })

    onMounted(() => {
      state.getVideo()
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-natu-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  overflow: hidden;
  height: 180px;
  width: 100%;
  background-image: url('../../../assets/img/banner-image/banner-natu-img/banner-natu.png');
  background-size: cover;

  video {
    transition: all .4s linear;
  }

  .hide-you {
    opacity: 0;
  }

  .is-load {
    opacity: 1;
  }
}
</style>
