<!--
 * @Author: zxy
 * @Date: 2021-06-06 14:23:44
 * @LastEditTime: 2021-11-24 17:39:09
 * @FilePath: /sku-blog-vite/src/components/adminPage/sidebar.vue
-->
<template>
  <aside class="sidebar-sec">
    <el-col class="sidebar-main">
      <el-menu router
        default-active="2">
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

<script>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
import store from '../../store'
import { useRoute } from 'vue-router'

export default {
  setup () {
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
        const pageName = proxy.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      })
    })

    return {
      ...toRefs(state),
    }
  }
}
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
