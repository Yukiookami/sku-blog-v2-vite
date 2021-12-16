<!--
 * @Author: zxy
 * @Date: 2021-05-05 19:14:15
 * @LastEditTime: 2021-11-23 20:35:01
 * @FilePath: /sku-blog-vite/src/components/topProgress/topProgress.vue
-->
<template>
  <progress class="top-pro" max="100" :value="proValue"></progress>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
// 公用ts
import { throttle } from '../../assets/js/common'

export default {
  setup () {
    const state = reactive({
      // 进度条值
      proValue: 0,
      /**
       * 计算进度条进度，页面滑动时触发
       *
       * @event
       */
      calPro: () => {
        // 页面高度
        let pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        // 视窗高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动高度
        let scrollAvail = pageHeight - windowHeight
        // 当前滚动高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        // 计算出数值
        if (scrollAvail) {
          state.proValue = (scrollTop / scrollAvail) * 100
        }
      },
      /**
       * @description: 进行节流操作
       * @param {*}
       * @return {*}
       */
      throttleFun: '',
    })

    onMounted(() => {
      state.throttleFun = throttle(state.calPro, 100)

      window.addEventListener('scroll', state.throttleFun, true)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', state.throttleFun, true)
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.top-pro {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 2px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);

  // 总长度背景色，谷歌
  &::-webkit-progress-bar {
    background: rgba(0, 0, 0, 0);
  }

  // 已完成进度背景色，谷歌
  &::-webkit-progress-value {
    background: linear-gradient(to right,rgba(248, 186, 11, .4), rgba(248, 186, 11, .8));
  }
}

</style>
