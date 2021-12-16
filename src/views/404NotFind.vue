<!--
 * @Author: zxy
 * @Date: 2021-07-11 10:59:43
 * @LastEditTime: 2021-07-11 11:32:59
 * @FilePath: /my-blog/src/views/404NotFind.vue
-->
<template>
  <top-nav></top-nav>

  <div class="blog-404-sec">
    <img src="../assets/img/statusImg/404-title.png">
    <img src="../assets/img/statusImg/404-line.png" alt="">
    <img src="../assets/img/statusImg/404-manga/man-1.png" alt="">
  </div>
  
  <blog-footer></blog-footer>
</template>

<script>
import { reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    topNav,
    blogFooter
  }
}
</script>

<style lang="scss" scoped>
.blog-404-sec {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 980px;
  margin: 80px auto 30px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}
</style>