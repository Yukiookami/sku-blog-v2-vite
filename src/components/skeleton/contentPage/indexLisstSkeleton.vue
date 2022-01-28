<!--
 * @Author: zxy
 * @Date: 2021-12-29 19:58:20
 * @LastEditTime: 2022-01-28 17:04:56
 * @FilePath: /sku-blog-vite/src/components/skeleton/contentPage/indexLisstSkeleton.vue
-->
<template>
<!-- 侧边导航骨架 -->
  <el-skeleton class="content-page-index-list" style="width: 100%" 
  :throttle="500"
  :loading="loading" animated :count="3">
    <template #template>
      <el-skeleton-item variant="text" class="content-page-index-list-type-class" />
      <el-skeleton-item variant="text" class="content-page-index-list-type-text" />
      <el-skeleton-item variant="text" class="content-page-index-list-type-text long" />
      <el-skeleton-item variant="text" class="content-page-index-list-type-text short" />
    </template>

    <template #default>
      <slot name="index"></slot>
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
.content-page-index-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // height: calc(100vh - 200px);
  max-height: 900px;
  width: 200px;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: scroll;
  // background-color: #000;

  &::-webkit-scrollbar {
    width: 0px;
  }
}

.content-page-index-list-type-class { 
  height: 30px;
  width: 200px;
  margin: 5px 0;
}

.content-page-index-list-type-text {
  height: 15px;
  width: 180px;
  margin: 5px 0 5px 20px;
}
</style>
