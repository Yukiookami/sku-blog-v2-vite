<template>
  <div class="content-top-sec"
  :class="{'content-top-sec-extend': maskFlag}"
  :style="{width: `${boxWidth}%`,
  backgroundImage: `url('${cover}')`}"
  @mouseenter="showMask"
  @mouseleave="showMask"
  @click="goToSenPage">
    <div class="content-top-mask"
    :class="{'content-top-mask-show': maskFlag}">
      <h3 class="content-top-title">{{title}}</h3>
      <p class="content-top-content">{{content}}</p>
    </div>
  </div>
</template>
 
<script>
import { reactive, toRefs, watchEffect } from 'vue'
// 引入router对象
import Router from '../../router'
import { goToPage } from '../../assets/js/common'

export default {
  // 封面，标题，内容，id，总数
  props: ['cover', 'title', 'content', 'id', 'cont', 'contentType'],
  setup (props) {
    Router.beforeEach((to, from, next) => {
      /* 路由发生变化修改页面title */
      if (to.meta.title === "文章页面" && props.title) {
        document.title = props.title
      } else {
        document.title = to.meta.title
      }

      next()
    })

    const state = reactive({
      // 显示mask
      maskFlag: false,
      /**
       * @event
       */
      showMask: () => {
        state.maskFlag = !state.maskFlag
      },
      // 盒子宽度
      boxWidth: 0,
      // 跳转文章页面
      goToSenPage: () => {
        goToPage('article', props.id, props.contentType)
      }
    })

    watchEffect(() => {
      props.cont > 1 ? state.boxWidth = (100 / props.cont) - 1 : state.boxWidth = 100
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.content-top-sec {
  font-family: $font-f;
  position: relative;
  overflow: hidden;
  height: 160px;
  border-radius: 15px;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, .5);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all .5s ease-in-out;
  cursor: pointer;

  .content-top-mask {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    transition: all .5s ease-in-out;
    text-align: center;
    opacity: 0;

    .content-top-title {
      background-color: #000;
      margin: 0 0 15px 0;
      padding: 10px 0;
      width: 100%;
      color: #FFF;
      transform: translateX(-100%);
      transition: inherit;
    }

    .content-top-content {
      font-style: italic;
      font-size: 12px;
      width: 100%;
      color: rgba(255, 255, 255, .7);
      transform: translateX(100%);
      transition: inherit;
    }
  }

  .content-top-mask-show {
    opacity: 1;

    .content-top-title {
      transform: translateX(0);
    }

    .content-top-content {
      transform: translateX(0);
    }
  }
}

.content-top-sec-extend {
  transform: scale(1.05);
}
</style>
