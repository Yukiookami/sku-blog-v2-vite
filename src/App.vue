<template>
  <div id="app">
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="router-loding">
        <component :is="Component"/>
      </transition>
    </router-view>
    <language></language>
  </div>
</template>

<script>
// 双语言
import language from './components/language/language.vue'
// 判断是否为PC端
import { isPC, detectZoom } from './assets/js/common'
import { ElMessage } from 'element-plus'
import { reactive, toRefs } from '@vue/reactivity'
import { computed, onBeforeMount, onMounted } from '@vue/runtime-core'
import store from './store'

export default {
  name: 'App',
  setup () {
    isPC()
    
    const state = reactive({
      lang: computed(() => store.state.langFlag),
      nowOs: computed(() => store.state.nowOs)
    })

    let isZoom = detectZoom()

    if (isZoom !== 100 && state.nowOs) {
      if (!state.lang) {
        ElMessage.warning('当前页面可能被缩放，请将比例调整至100%以获得最佳体验')
      } else {
        ElMessage.warning('現在のページはズームされている可能性があり、最高な体験を得るために比率を100%に調整してください')
      }
    }

    /**
     * @description: 判断当前用户语言
     * @param {*}
     * @return {*}
     */    
    const nowLang = () => {
      let lang = navigator.language
      let lastLangSet = localStorage.getItem('blog_last_lang_set')
      
      if (lastLangSet) {
        store.commit('setLangFlag', +lastLangSet)
        localStorage.setItem('blog_last_lang_set', lastLangSet)
      } else {
        if (lang === 'zh-CN') {
          store.commit('setLangFlag', 0)
          localStorage.setItem('blog_last_lang_set', '0')
        } else {
          store.commit('setLangFlag', 1)
          localStorage.setItem('blog_last_lang_set', '1')
        }
      }
    }

    nowLang()
    
    return {
      ...toRefs(state),
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    language,
  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';

*:focus {
  outline: none;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

* {
  touch-action: pan-y !important;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

body {
  margin: 0;
  padding: 0;
}

.router-loding-enter-from,
.router-loding-leave-to {
  opacity: 0;
}

.router-loding-enter-to,
.router-loding-leave-from {
  opacity: 1;
}

.router-loding-enter-active,
.router-loding-leave-active {
  transition: all .5s ease-in-out
}

/* 更改滚动条样式 */
/* 滚动条宽度 */
::-webkit-scrollbar {
 width: 3px;
 /* height: 10px; */
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
 background-color: $color-blog-yel;
 border-radius: 3px;
}

/* 老婆 */
.live2d-widget-container {
  left: 10px !important;
  bottom: 0px !important;
}

#nprogress {
  z-index: 2147483647 !important;

  .bar {
    background: linear-gradient(to right,rgba(248, 186, 11, .4), rgba(248, 186, 11, .8)) !important;
    height: 3px !important;

    .peg {
      box-shadow: 0 0 10px rgba(248, 186, 11, .4);
    }
  }
}
</style>
