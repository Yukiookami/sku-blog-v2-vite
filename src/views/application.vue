<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- banner区域 -->
    <banner-natu class="load-from-top"></banner-natu>
    <!-- bannerEnd -->
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <main class="app-page-main">
      <h1 class="page-title">{{pageTag}}</h1>

      <content-line title="Web application" :icon="web"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.appCover" :appName="item.appName" :router="item.appUrl"
          :appPackage="item.appPackge"
          :isPay="0" v-if="item.appPlatform === 'Web application'"></app-item>
        </template>
      </div>

      <content-line title="Windows application" :icon="teb"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`win${index}`">
          <app-item :cover="item.appCover" :appName="item.appName" :router="item.appUrl"
          :appPackage="item.appPackge"
          :isPay="0" v-if="item.appPlatform === 'Windows application'"></app-item>
        </template>
      </div>

      <content-line title="Mac application" :icon="mac"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`mac${index}`">
          <app-item :cover="item.appCover" :appName="item.appName" :router="item.appUrl"
          :appPackage="item.appPackge"
          :isPay="0" v-if="item.appPlatform === 'Mac application'"></app-item>
        </template>
      </div>

      <content-line title="IOS" :icon="ios"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`ios${index}`">
          <app-item :cover="item.appCover" :appName="item.appName" :router="item.appUrl"
          :appPackage="item.appPackge"
          :isPay="0" v-if="item.appPlatform === 'IOS'"></app-item>
        </template>
      </div>

      <content-line title="Android" :icon="and"></content-line>
      <div class="app-item-sec">
        <template v-for="(item, index) in appList" :key="`and${index}`">
          <app-item :cover="item.appCover" :appName="item.appName" :router="item.appUrl"
          :appPackage="item.appPackge"
          :isPay="0" v-if="item.appPlatform === 'Android'"></app-item>
        </template>
      </div>
    </main>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'
import store from '../store'
import bannerNatu from '../components/banner/2021-natu/bannerNatu.vue'
// content-line
import contentLine from '../components/contentLine/contentLine.vue'
// appItem
import appItem from '../components/appItem/appItem.vue'
// 初始动画
import '../assets/css/loadAnime.css'

// 引入图标
import web from '../assets/img/fontIcon/webapp.svg'
import teb from '../assets/img/fontIcon/app.svg'
import mac from '../assets/img/fontIcon/macapp.svg'
import ios from '../assets/img/fontIcon/iosapp.svg'
import and from '../assets/img/fontIcon/androidapp.svg'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      /**
       * 获取当前页面路由
       */
      pageTag: computed(() => {
        const { proxy } = getCurrentInstance()
        const pageName = proxy.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      }),
      // appList
      appList: [],
      /**
       * @description: 获得所有app数据
       * @param {*}
       * @return {*}
       */      
      getAllApp: () => {
        proxy.$http.get(`${API}api/appKanri/getAllApp`)
          .then((res) => {
            state.appList = res.data.list
          })
      }
    })

    state.getAllApp()

    return {
      ...toRefs(state),
      web,
      teb,
      mac,
      ios,
      and
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress,
    bannerNatu,
    contentLine,
    appItem
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

.app-page-main {
  width: 800px;
  margin: 40px auto;
  min-height: calc(100vh - 468.3px);

  .app-item-sec {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  // 标题
  .page-title {
    font-size: 30px;
    // font-family: 'Noto Serif SC','Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;;
    font-family: $font-f;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
    font-weight: 100;
    text-align: center;

    &::after {
      content: '}';
      margin-left: 6px;
    }

    &::before {
      content: '{';
      margin-right: 6px;
    }

    &::after,
    &::before {
      color: $color-blog-yel;
      font-size: 1.5em;
      font-weight: 100;
      vertical-align: sub;
    }
  }
}
</style>
