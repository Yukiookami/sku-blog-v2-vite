<!--
 * @Author: zxy
 * @Date: 2021-05-17 20:06:48
 * @LastEditTime: 2021-07-05 16:21:39
 * @FilePath: /my-blog/src/components/viewMore/viewMore.vue
-->
<template>
  <div class="view-more-box">
    <span @click="go">view more</span>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../assets/js/common'

export default {
  props: ['typeId', 'contentType'],
  setup (props) {
    const state = reactive({
      go: () => {
        goToPage('class', props.typeId, props.contentType)
      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.view-more-box {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin: 40px auto 80px;
  display: inline-block;

  span {
    padding: 13px 35px;
    border: 1px solid #d6d6d6;
    border-radius: 50px;
    color: #adadad;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      color: $color-blog-yel;
      border-color: $color-blog-yel;;
    }
  }

}
</style>
