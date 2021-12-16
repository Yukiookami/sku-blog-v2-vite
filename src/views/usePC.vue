<!--
 * @Author: zxy
 * @Date: 2021-07-11 12:23:27
 * @LastEditTime: 2021-11-23 20:47:16
 * @FilePath: /sku-blog-vite/src/views/usePC.vue
-->
<template>
  <div v-if="!langeFlag" class="use-pc-plase">
    <img src="../assets/img/statusImg/empty.png" alt="">
    <span>手机端开发中，请使用电脑浏览</span>
  </div>

  <div v-else class="use-pc-plase">
    <img src="../assets/img/statusImg/empty.png" alt="">
    <span>モバイルバージョンは開発しており、PCでご覧ください</span>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import store from '../store'

export default {
  setup () {
    const state = reactive({
      langeFlag: computed(() => store.state.langFlag)
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.use-pc-plase {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 20px);
  padding: 10px;

  img {
    margin-bottom: 30px;
  }
}
</style>