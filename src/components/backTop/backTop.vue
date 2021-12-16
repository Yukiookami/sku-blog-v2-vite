<template>
  <div class="go-to-top"
  :class="{'show': showKi}"
  @click="goBackToTop">
    <img v-cloak ref="starImg" class="star-img" :class="{'star-move': showKi}"
    src="../../assets/img/pageTools/star.png" alt="">
  </div>

  <div class="kitune-hide"
  :class="{'kitune-show': showKi || kituneFlag}"
  :style="{'top': `${kituneHeight}px`}"
  @mouseenter="showKitune"
  @mouseleave="showKitune"
  @click="goBackToTop">
    <img v-cloak :class="{'kitune-move': showKi || kituneFlag}" :src="kituneImg" alt="">
  </div>
</template>

<script>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs, watchEffect } from 'vue'
import { throttle } from '../../assets/js/common'
import './css/kituneMove.css'

// 导入小狐狸
import kituneHide from '../../assets/img/pageTools/kitune-hide.png'
import kituneCome from '../../assets/img/pageTools/kitune-come.png'

export default {
  setup () {
    const state = reactive({
      showKi: false,
      /**
       * 返回顶部，在点击时触发
       *
       * @event
       */
      goBackToTop: () => {
        let timer = setInterval(() => {
          let top = document.documentElement.scrollTop - 40
          if (top <= 0) {
            window.scrollTo(0, 0)
            clearInterval(timer)
          } else {
            window.scrollTo(0, top - 40)
          }
        }, 20)

        timer
      },
      // 小狐狸图片
      kituneImg: kituneHide,
      // 显示小狐狸
      kituneFlag: false,
      // 小狐狸的高度
      kituneHeight: 662,
      /**
       * 显示小狐狸，当鼠标放上时触发
       *
       * @event
       */
      showKitune: () => {
        state.kituneFlag = !state.kituneFlag
      },
      /**
       * 获取视窗高度
       *
       * @returns {number}
       */
      getViewHeight: () => document.documentElement.clientHeight,
      // 返回视窗布尔值
      winShow: false,
      /**
       * 判断是否显示小狐狸
       */
      checkWinShow: () => {
        let winTop = document.documentElement.scrollTop
        if (winTop > state.getViewHeight() / 3) {
          state.winShow = true
        } else {
          state.winShow = false
        }
      },
      /**
       * 监听页面，滚动触发
       *
       * @event
       */
      listenPageTop: () => {
        // 判断显示小狐狸
        state.checkWinShow()
      },
      /**
       * @description: 进行节流操作
       * @param {*}
       * @return {*}
       */
      throttleFun: ''
    })

    watchEffect(() => {
      if (state.winShow) {
        state.showKi = true
        state.kituneImg = kituneCome
      } else {
        state.showKi = false
        state.kituneImg = kituneHide
      }
    })

    // 获取绳子高度
    const starImg = ref(null)

    const getHeight = async () => {
      nextTick(() => {
        setTimeout(() => {
          if (starImg.value) {
            state.kituneHeight = starImg.value.clientHeight - 60
          }
        }, 2000)
      })
    }

    onMounted(() => {
      state.throttleFun = throttle(state.listenPageTop, 100)

      window.addEventListener('scroll', state.throttleFun, true)
      getHeight()
    })

    onBeforeUnmount(() => {
      // 销毁滚动事件
      window.removeEventListener('scroll', state.throttleFun, true)
    })

    return {
      ...toRefs(state),
      starImg
    }
  }
}
</script>

<style lang="scss" scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  right: -5vw;
  top: 0;
  transition: all 1s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 0% 0%;
  z-index: 99999999;

  .star-img {
    width: 250px;
  }

}

.kitune-hide {
  position: fixed;
  right: -4vw;
  width: 100px;
  transition: all 1s ease-in-out;
  transform: rotate(-15deg);
  cursor: pointer;

  img {
    width: 100%;
  }
}

.kitune-show {
  right: .3vw;
}

.show {
  transform: rotate(-1deg);
}

</style>
