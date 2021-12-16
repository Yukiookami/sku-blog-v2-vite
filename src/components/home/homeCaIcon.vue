<!--
 * @Author: zxy
 * @Date: 2021-07-08 23:13:36
 * @LastEditTime: 2021-11-23 20:36:25
 * @FilePath: /sku-blog-vite/src/components/home/homeCaIcon.vue
-->
<template>
  <a :href="url" target="_blank" v-if="url" class="icon-box">
    <img :src="icon" alt="" />
  </a>

  <div v-else
  class="icon-box"
  @click="copy">
    <img :src="icon" alt="" />
    <input type="text" ref="catText" :value="text">
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, toRefs } from "vue";
import { ElMessage } from 'element-plus'

export default {
  props: ["icon", "url", "text"],
  setup(props) {
    const catText = ref(null)
    const { proxy } = getCurrentInstance()

    const state = reactive({
      copy: () => {
        proxy.$nextTick(() => {
          const val = catText.value
          val.select()
          let res = document.execCommand('copy')
          if (res) {
            ElMessage.success('内容已复制到剪切板')
          } else {
            ElMessage.error('该浏览器不支持复制')
          }
        })
      }
    });

    return {
      ...toRefs(state),
      catText
    };
  }
};
</script>

<style lang="scss" scoped>
  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    margin: 0 10px;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      z-index: -10;
    }

    img {
      width: 100%;
    }
  }
</style>
