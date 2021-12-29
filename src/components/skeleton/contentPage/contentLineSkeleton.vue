<!--
 * @Author: zxy
 * @Date: 2021-12-29 19:34:00
 * @LastEditTime: 2021-12-29 20:07:35
 * @FilePath: /sku-blog-vite/src/components/skeleton/contentLineSkeleton.vue
-->
<template>
<!-- 文章line骨架 -->
  <el-skeleton class="content-top-line-ske-main" style="width: 100%" 
  :throttle="500"
  :loading="loading" animated :count="1">
    <template #template>
      <el-skeleton-item variant="text" class="content-top-line-ske" />
    </template>

    <template #default>
      <slot name="line"></slot>
    </template>
  </el-skeleton>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.content-top-line-ske { 
  height: 25px;
  width: 100px;

}

.content-top-line-ske-main {
  margin-bottom: 30px;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 1px dashed #ececec;
  }
}
</style>
