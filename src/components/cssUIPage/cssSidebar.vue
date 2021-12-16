<!--
 * @Author: zxy
 * @Date: 2021-06-06 14:23:44
 * @LastEditTime: 2021-11-23 20:45:28
 * @FilePath: /sku-blog-vite/src/components/cssUIPage/cssSidebar.vue
-->
<template>
  <aside class="sidebar-sec">
    <el-col class="sidebar-main">
      <el-menu router
        default-active="2">
        <el-menu-item index="cssButton">
          <i class="el-icon-star-off"></i>
          <template #title>纯CSS按钮</template>
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
