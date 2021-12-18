<template>
  <div>
    <!-- 导航 -->
    <TopNav></TopNav>
    <!-- banner区域 -->
    <BannerFuyu class="load-from-top"></BannerFuyu>
    <!-- bannerEnd -->
    <!-- 返回小狐狸 -->
    <BakcTop></BakcTop>
    <!-- 顶部进度条 -->
    <TopProgress></TopProgress>

    <main class="app-page-main">
      <h1 class="page-title">{{ state.pageTag }}</h1>

      <ContentLine title="Web application" :icon="web"></ContentLine>
      <div class="app-item-sec">
        <template
          class="load-from-bottom"
          v-for="(item, index) in state.appList"
          :key="`web${index}`"
        >
          <AppItem
            :cover="item.appCover"
            :appName="item.appName"
            :router="item.appUrl"
            :appPackage="item.appPackge"
            :isPay="0"
            v-if="item.appPlatform === 'Web application'"
          ></AppItem>
        </template>
      </div>

      <ContentLine title="Windows application" :icon="teb"></ContentLine>
      <div class="app-item-sec">
        <template
          class="load-from-bottom"
          v-for="(item, index) in state.appList"
          :key="`win${index}`"
        >
          <AppItem
            :cover="item.appCover"
            :appName="item.appName"
            :router="item.appUrl"
            :appPackage="item.appPackge"
            :isPay="0"
            v-if="item.appPlatform === 'Windows application'"
          ></AppItem>
        </template>
      </div>

      <ContentLine title="Mac application" :icon="mac"></ContentLine>
      <div class="app-item-sec">
        <template
          class="load-from-bottom"
          v-for="(item, index) in state.appList"
          :key="`mac${index}`"
        >
          <AppItem
            :cover="item.appCover"
            :appName="item.appName"
            :router="item.appUrl"
            :appPackage="item.appPackge"
            :isPay="0"
            v-if="item.appPlatform === 'Mac application'"
          ></AppItem>
        </template>
      </div>

      <ContentLine title="IOS" :icon="ios"></ContentLine>
      <div class="app-item-sec">
        <template
          class="load-from-bottom"
          v-for="(item, index) in state.appList"
          :key="`ios${index}`"
        >
          <AppItem
            :cover="item.appCover"
            :appName="item.appName"
            :router="item.appUrl"
            :appPackage="item.appPackge"
            :isPay="0"
            v-if="item.appPlatform === 'IOS'"
          ></AppItem>
        </template>
      </div>

      <ContentLine title="Android" :icon="and"></ContentLine>
      <div class="app-item-sec">
        <template v-for="(item, index) in state.appList" :key="`and${index}`">
          <AppItem
            :cover="item.appCover"
            :appName="item.appName"
            :router="item.appUrl"
            :appPackage="item.appPackge"
            :isPay="0"
            v-if="item.appPlatform === 'Android'"
          ></AppItem>
        </template>
      </div>
    </main>

    <!-- 页脚 -->
    <BlogFooter></BlogFooter>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, toRefs } from "vue";
// 顶部导航
import TopNav from "../components/nav/topNav.vue";
// 返回顶部小狐狸
import BakcTop from "../components/backTop/backTop.vue";
// 页脚
import BlogFooter from "../components/blogFooter/blogFooter.vue";
// 顶部滚动条
import TopProgress from "../components/topProgress/topProgress.vue";
import store from "../store";
import BannerFuyu from "../components/banner/2021-fuyu/bannerFuyu.vue";
// content-line
import ContentLine from "../components/contentLine/contentLine.vue";
// appItem
import AppItem from "../components/appItem/appItem.vue";
// 初始动画
import "../assets/css/loadAnime.css";

// 引入图标
import web from "../assets/img/fontIcon/webapp.svg";
import teb from "../assets/img/fontIcon/app.svg";
import mac from "../assets/img/fontIcon/macapp.svg";
import ios from "../assets/img/fontIcon/iosapp.svg";
import and from "../assets/img/fontIcon/androidapp.svg";
import axios from "axios";

const { proxy } = getCurrentInstance();
const API = proxy.$API;

const state = reactive({
  /**
   * 获取当前页面路由
   */
  pageTag: computed(() => {
    const { proxy } = getCurrentInstance();
    const pageName = proxy.$router.currentRoute.value.path;

    let page = store.state.meunList.find((ele) => ele.router === pageName);
    return page?.pageTitle;
  }),
  // appList
  appList: []
});

/**
 * @description: 获得所有app数据
 * @param {*}
 * @return {*}
 */
const getAllApp = () => {
  proxy.$http.get(`${API}api/appKanri/getAllApp`).then((res) => {
    state.appList = res.data.list;
  });
}

axios.all([
  getAllApp()
])
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";

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
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    font-weight: 100;
    text-align: center;

    &::after {
      content: "}";
      margin-left: 6px;
    }

    &::before {
      content: "{";
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
