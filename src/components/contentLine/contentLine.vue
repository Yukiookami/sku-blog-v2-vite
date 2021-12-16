<!--
 * @Author: zxy
 * @Date: 2021-04-25 14:49:37
 * @LastEditTime: 2021-07-05 15:50:46
 * @FilePath: /my-blog/src/components/contentLine/contentLine.vue
-->
<template>
  <div class="content-line" @click="go">
    <div class="content-line-icon-box">
      <img :src="icon" alt="">
    </div>

    <h3>{{title}}</h3>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../assets/js/common'

export default {
  props: ['icon', 'title', 'id', 'contentType'],
  setup (props) {
    const state = reactive({
      count: 0,
      go: () => {
        if (props.id) {
          goToPage('class', props.id, props.contentType)
        }
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.content-line {
  font-family: $font-f;
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;
  border-bottom: 1px dashed #ececec;
  text-decoration: none;
  cursor: pointer;

  .content-line-icon-box {
    width: 20px;
    margin-right: 10px;

    img {
      width: 100%;
    }
  }

  h3 {
    margin: 0;
    font-weight: 400;
  }
}
</style>
