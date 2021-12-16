<!--
 * @Author: zxy
 * @Date: 2021-05-15 16:46:11
 * @LastEditTime: 2021-11-23 20:50:34
 * @FilePath: /sku-blog-vite/src/components/language/language.vue
-->
<template>
  <div class="lang-button">
    <div class="lang-box" :class="{'show-lang-box': showLang}">
      <span @click="changeLang(0)" :class="{'sel': !lang}">中文</span>
      <span @click="changeLang(1)" :class="{'sel': lang}">日本語</span>
    </div>

    <span @click="changeLangShow">Change language</span>
    <i class="el-icon-s-tools haguruma"></i>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { detectZoom } from '../../assets/js/common'
import store from '../../store'
import { ElMessage } from 'element-plus'

export default {
  setup () {
    const state = reactive({
      lang: computed(() => store.state.langFlag),
      nowOs: computed(() => store.state.nowOs),
      /**
       * 更改语言 点击触发
       * @event
       */
      changeLang: (flag) => {
        if (flag !== state.lang) {
          if (!flag) {
            store.commit("setLangFlag", 0)
            // @ts-ignore
            localStorage.setItem('blog_last_lang_set', 0)
            ElMessage.success('正在将网页语言切换为中文')
          } else {
            store.commit("setLangFlag", 1)
            // @ts-ignore
            localStorage.setItem('blog_last_lang_set', 1)
            ElMessage.success('日本語に転換しています')
          }
        }

        state.changeLangShow()
        setTimeout(state.isZoomFn, 4000)
      },
      /**
       * @description: 判断页面是否缩放
       * @param {*}
       * @return {*}
       */    
      isZoomFn: () => {
        let isZoom = detectZoom()

        if (isZoom !== 100 && state.nowOs) {
          if (!state.lang) {
            ElMessage.warning('当前页面可能被缩放，请将比例调整至100%以获得最佳体验')
          } else {
            ElMessage.warning('現在のページはズームされている可能性があり、最高な体験を得るために比率を100%に調整してください')
          }
        }
      }, 
      showLang: false,
      /**
       * @description: 更改语言面板显示状态
       * @param {*}
       * @return {*}
       */      
      changeLangShow: () => {
        state.showLang = !state.showLang
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

.lang-button {
  font-family: $font-f;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 10px;
  right: 20px;
  justify-content: center;
  z-index: 2147483647;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: $color-blog-yel;
  }

  .lang-box {
    position: absolute;
    top: -55px;
    padding: 10px;
    background-color: rgba(255, 255, 255, .8);
    height: 20px;
    line-height: 20px;
    border-radius: 5px;
    transition: all .3s ease-in-out;
    transform: translateY(30px);
    opacity: 0;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 50%;
      margin-left: -15px;
      border-width: 15px;
      border-style: solid;
      border-color: rgba(255, 255, 255, .8) transparent transparent transparent;
    }

    span {
      color: #333;
      transition: all .3s ease-in-out;
      margin: 0 3px;
      
      &:hover {
        color: $color-blog-yel;
      }
    }
    
    .sel {
      color: $color-blog-yel;
    }
  }

  .show-lang-box {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .haguruma {
    margin-left: 5px;
    vertical-align: middle;
    user-select: none;
    animation: sakura 7s linear 0s infinite normal;
  }

  @keyframes sakura {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
