<!--
 * @Author: zxy
 * @Date: 2021-05-30 17:10:10
 * @LastEditTime: 2021-12-30 15:33:39
 * @FilePath: /sku-blog-vite/src/views/adminPage/adminHome.vue
-->
<template>
  <div class="admin-main-sec">
    <!-- 导航 -->
    <TopNav></TopNav>
    <!-- 返回小狐狸 -->
    <!-- <bakc-top></bakc-top> -->
    <!-- 顶部进度条 -->
    <TopProgress></TopProgress>

    <section class="show-view">
      <!-- 侧边导航 -->
      <Sidebar class="sidebar-box"></Sidebar>
      <!-- 显示区域 -->
      <router-view class="view-box" :class="{'show-back': state.notHome}"></router-view>
    </section>

    <!-- 页脚 -->
    <BlogFooter v-if="state.notHome"></BlogFooter>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
// 顶部导航
import TopNav from '../../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../../components/backTop/backTop.vue'
// 页脚
import BlogFooter from '../../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import TopProgress from '../../components/topProgress/topProgress.vue'
// 侧边栏
import Sidebar from '../../components/adminPage/sidebar.vue'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()

const route = useRoute()

const state = reactive({
  /**
   * @description: 拿到id
   * @param {*}
   * @return {*}
   */
  userId: computed(() => {
    return proxy.$cookie.getCookie("login_SKU_cookies")
  }),
  // 是否为管理段首页
  notHome: computed(() => {
    if (route.fullPath === '/home') {
      return false
    } else {
      return true
    }
  })
})
</script>

<style lang="scss" scoped>
.admin-main-sec {

  .show-view {
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 3px);
    min-height: calc(100vh - 248px);

    .sidebar-box {
      width: 15%;
      min-height: calc(100vh - 248px);
    }

    .view-box {
      width: calc(85% - 60px);
      // height: calc(100vh - 280px);
    }

    .show-back {
      margin-bottom: -70px;
      margin-top: 60px;
      margin-right: 10px;
      padding: 20px;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 0 5px rgba(255, 192, 203, 0.7);
    }
  }
}
</style>
