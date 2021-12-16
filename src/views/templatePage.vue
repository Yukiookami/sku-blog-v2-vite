<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>


    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'

export default {
  setup () {
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
    topProgress
  }
}
</script>

<style lang="scss" scoped>

</style>
