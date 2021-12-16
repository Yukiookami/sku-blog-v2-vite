<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <!-- <bakc-top></bakc-top> -->
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <div class="sen-main-sec">
      <header class="header-banner">
        <img :src="senObj.coverImg" alt="">

        <div class="sen-cover-title-box">
          <h1>{{senObj.title}}</h1>
          <div>
            <span>{{senObj.sakusya}}</span>
            ・
            <span>{{timeText}}{{senObj.date}}</span>
          </div>
        </div>
      </header>

      <main class="content-main" id="scroll-wrapper" ref="scrollWrapper">
        <div class="content-box">
          <v-md-preview :text="senObj.markdownContent" id="loading-animation" ref="preview"></v-md-preview>
        </div>

        <!-- 目录轴 -->
        <div class="fixed-cat">
          <div id="catalog-content-wrapper"></div>
        </div>
      </main>
    </div>
    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
// import { setYome } from '../assets/js/yome'
// 引入通用ts
import { timeChange } from '../assets/js/common'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'
// 引入
// 引入base64
import Base64 from '../assets/js/base64'
import store from '../store'
// 目录
import Catalog from '../assets/js/cat'
// import Catalog from '../assets/js/progress-catalog'

export default {
  setup () {
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const preview = ref(null)
    const scrollWrapper = ref(null)

    const state = reactive({
      lang: computed(() => store.state.langFlag),
      timeText: computed(() => {
        if (!state.lang) {
          return '发布于 '
        } else {
          return '作成日 '
        }
      }),
      // id
      id: computed(() => Base64.decode(route.query.id)),
      contentType: computed(() => Base64.decode(route.query.type)),
      // 文章数据
      senObj: {},
      // 请求获得的数据
      resList: [],
      /**
       * 根据id请求数据
       */
      getSen: () => {
        proxy.$http.get(`${API}api/content/getContent?id=${state.id}&&contentType=${state.contentType}`)
          .then((res) => {
            state.resList = res.data.list
            state.changeDataByLange()
          })
      },
      /**
       * @description: 根据语言改变显示内容
       * @param {*}
       * @return {*}
       */      
      changeDataByLange: () => {
        let { cnContentInfo, jaContentInfo } = state.resList
        if (!store.state.langFlag) {
          // 中文
          cnContentInfo.date = timeChange(cnContentInfo.date)
          state.senObj = cnContentInfo
        } else {
          // 日语
          jaContentInfo.date = timeChange(jaContentInfo.date)
          state.senObj = jaContentInfo
        }

        state.initArc()
      },
      // 销毁事件
      desEvent: '',
      /**
       * @description: 设置文章目录
       * @param {*}
       * @return {*}
       */      
      initArc: () => {
        // 文章目录
        proxy.$nextTick(() => {
          let cat = new Catalog({
            contentEl: 'loading-animation',
            catalogEl: `catalog-content-wrapper`,
            selector: ['h2', 'h3', 'h4'],
            scrollWrapper: scrollWrapper.value
          })

          state.desEvent = cat
        })
          // const content = preview.value
          // console.log(content.html)
        // console.log(content.html.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g))
        // const toc:string[] = content.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
        // 文章目录end
      }
    })

    onMounted(() => {
      state.getSen()
      // 设置并监听标题
      if(state.senObj.title) {
        document.title = state.senObj.title
      }

      watch(() => state.senObj,
      (senObj) => {
        if(senObj.title) {
          document.title = senObj.title
        }
      })

      watch(() => store.state.langFlag, () => {
        state.changeDataByLange()
      })
    })

    onBeforeUnmount(() => {
      state.desEvent()
    })

    return {
      ...toRefs(state),
      preview,
      scrollWrapper
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress
  }
}
</script>

<style lang="scss">
@import '../assets/css/common.scss';
@import '../assets/css/progress-catalog.css';
// 主区域
.sen-main-sec {
  min-height: calc(100vh - 248.3px);

  .header-banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 400px;

    img {
      object-fit: cover;
      width: 100%;
      pointer-events: none;
      user-select: none;
    }

    .sen-cover-title-box {
      font-family: $font-f;
      width: 800px;
      position: absolute;
      bottom: 0;
      color: #fff;
      text-shadow: 0 0 10px rgba(0, 0, 0, 1);
      padding-bottom: 40px;
      letter-spacing: 2px;

      h1 {
        font-weight: normal;
      }
    }
  }
  // 文章区域
  .content-main {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 3vw 0 12vw;

    .content-box {
      width: 81vw;
    }

    // 目录轴
    .fixed-cat {
      
      #catalog-content-wrapper {
        position: sticky;
        top: 80px;
        width: 14vw;
        line-height: 24px;
      }
    }
  }
}
</style>
