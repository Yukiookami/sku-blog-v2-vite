<!--
 * @Author: zxy
 * @Date: 2021-04-26 15:21:20
 * @LastEditTime: 2021-07-03 16:03:08
 * @FilePath: /my-blog/src/components/contentPageItem/contentPageItemTag/contentPageItemTag.vue
-->
<template>
<!-- @click="go" -->
  <div class="item-tag">
    <i class="el-icon-collection-tag"></i>
    <span>{{tagName}}</span>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../../assets/js/common'

export default {
  props: ['tagName', 'tagId'],
  setup (props) {
    const state = reactive({
      count: 0,
      go: () => {
        goToPage('class', props.tagId)
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-tag {
  font-size: 12px;
  color: #888;
  cursor: pointer;
  margin: 0 3px;

  i {
    margin-right: 5px;
  }
}
</style>
