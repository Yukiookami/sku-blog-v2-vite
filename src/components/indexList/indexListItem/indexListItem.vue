<template>
  <div>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  // 标题，文章标题，标题索引，文章索引，数组长度
  props: ['title', 'contentTitle', 'titleIndex', 'contentIndex', 'numberList'],
  setup () {
    const state = reactive({
      count: 0,
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
