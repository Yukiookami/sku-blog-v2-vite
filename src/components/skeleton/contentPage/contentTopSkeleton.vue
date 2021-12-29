<!--
 * @Author: zxy
 * @Date: 2021-12-29 11:59:17
 * @LastEditTime: 2021-12-29 19:53:12
 * @FilePath: /sku-blog-vite/src/components/skeleton/contentTopSkeleton.vue
-->
<template>
<!-- 置顶文章骨架 -->
    <el-skeleton style="width: 100%;" 
    :throttle="500"
    :loading="loading" animated :count="1">
      <template #template>
        <div class="content-top-skeleton">
          <el-skeleton-item variant="image" style="height: 160px; width: 32%;" />
          <el-skeleton-item variant="image" style="height: 160px; width: 32%;" />
          <el-skeleton-item variant="image" style="height: 160px; width: 32%;" />
        </div>
      </template>

      <template #default>
        <slot name="line"></slot>
        <slot name="content"></slot>
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
.content-top-skeleton {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}
</style>