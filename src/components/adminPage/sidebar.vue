<!--
 * @Author: zxy
 * @Date: 2021-06-06 14:23:44
 * @LastEditTime: 2021-12-30 15:43:57
 * @FilePath: /sku-blog-vite/src/components/adminPage/sidebar.vue
-->
<template>
  <aside class="sidebar-sec">
    <el-col class="sidebar-main">
      <el-menu router
        :default-active="state.pageTag">
        <el-menu-item index="home">
          <i class="el-icon-apple"></i>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-collection"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="add">文章增/改</el-menu-item>
            <el-menu-item index="typeClass">类型管理</el-menu-item>
            <el-menu-item index="kanri">文章删/查</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="appKanri">
          <i class="el-icon-star-off"></i>
          <template #title>应用管理</template>
        </el-menu-item>
        <el-menu-item index="homePageKanri">
          <i class="el-icon-picture-outline-round"></i>
          <template #title>首页图片</template>
        </el-menu-item>
        <el-menu-item index="UserKanri">
          <i class="el-icon-user"></i>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="imgUpLoad">
          <i class="el-icon-upload"></i>
          <template #title>图片上传</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </aside>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
import store from '../../store'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()

const state = reactive({
  // 侧边栏导航列表
  navList: computed(() => {
    return store.state.adminList
  }),
  /**
   * 获取当前页面路由
   */
  pageTag: computed(() => {
    const pageName = route.fullPath

    return pageName.slice(1)
  })
})
</script>

<style lang="scss" scoped>
.sidebar-sec {

  .sidebar-main {
    height: 100%;
    width: 100%;

    ul {
      position: fixed;
      left: 0;
      padding-top: 80px;
      height: 100%;
      width: 15%;
      z-index: 1;
    }
  }
}
</style>
