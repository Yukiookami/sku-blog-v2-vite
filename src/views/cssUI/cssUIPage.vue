<!--
 * @Author: zxy
 * @Date: 2021-05-30 17:10:10
 * @LastEditTime: 2021-08-17 13:34:34
 * @FilePath: /my-blog/src/views/cssUI/cssUIPage.vue
-->
<template>
  <div class="admin-main-sec">
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <!-- <bakc-top></bakc-top> -->
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <section class="show-view">
      <!-- 侧边导航 -->
      <css-sidebar class="sidebar-box"></css-sidebar>
      <!-- 显示区域 -->
      <router-view class="view-box"></router-view>
    </section>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import topProgress from '../../components/topProgress/topProgress.vue'
// 侧边栏
import cssSidebar from '../../components/cssUIPage/cssSidebar.vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()

    const state = reactive({

    })

    return {
      ...toRefs(state),
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress,
    cssSidebar
  }
}
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
