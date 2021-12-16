<!--
 * @Author: zxy
 * @Date: 2021-04-19 01:07:40
 * @LastEditTime: 2021-11-23 21:07:52
 * @FilePath: /sku-blog-vite/src/components/home/indexNav.vue
-->
<template>
  <router-link class="meun-item-sec" :to="router"
  :style="{width: `${boxWidth}vw`,
  left: `${index * (100 / cont)}vw`,
  transitionDelay: `${index * 0.2}s`}">
    <span v-if="!lang" class="link-title">{{title}}</span>
    <span v-else class="link-title jp-title">{{jpTitle}}</span>
  </router-link>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from 'vue'
import store from '../../store'

export default {
  // 是否展开，跳转路由，显示文字，盒子排列（决定收起顺序），盒子总数
  props: ['changeRotate', 'router', 'title', 'index', 'cont', 'jpTitle'],
  setup (props) {
    const state = reactive({
      boxWidth: 0,
      lang: computed(() => store.state.langFlag)
    })

    watchEffect(() => {
      if (props.changeRotate) {
        state.boxWidth = 100 / props.cont
      } else {
        state.boxWidth = 0
      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.meun-item-sec {
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  font-family: $font-f-nav;
  font-size: 40px;
  height: 100vh;
  z-index: 99;
  // background-color: #191919;
  // background-color: #f5f5f5;
  backdrop-filter: blur(20px);
  cursor: pointer;
  user-select: none;
  transition: .7s ease-in-out;
  text-decoration: none;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    height: 100%;
    width: 3px;
    background-color: #fff;
  }

  &::before {
    content: '';
    position: absolute;
    top: 51%;
    bottom: 0;
    left: calc(50% - 8rem);
    display: block;
    height: 20px;
    width: 0;
    // background-color: #fff;
    background-color: rgb(106, 104, 104, .5);
    z-index: -1;
    transition: .5s ease-in-out;
  }

  &:hover {
    // background-color: #e3e3e3;

    &::before {
      width: 15rem;
    }
  }

  .link-title {
    position: relative;
    // color: #191919;
    color: #fff;
  }

  .jp-title {
    font-family: 'M PLUS 1p mediu';
  }
}
</style>
