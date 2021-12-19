<!--
 * @Author: zxy
 * @Date: 2021-12-18 18:49:07
 * @LastEditTime: 2021-12-19 00:30:23
 * @FilePath: /sku-blog-vite/src/components/lazyLoad/lazyLoad.vue
-->
<template>
  <el-skeleton class="lazy-load-img flash-container">
    <template #template>
      <img src="../../assets/img/statusImg/lazy-load.png" alt="">
    </template>
  </el-skeleton>
</template>

<script setup>
const props = defineProps({
  // 是否开启动画
  anime: {
    type: Boolean,
    defalut: true
  }
})
</script>

<style lang="scss" scoped>
.lazy-load-img {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 40px;
    width: 40px;
  }
}

.flash-container {
  background-color: #eee;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    height: 150%;
    width: 25px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    margin: auto;
    opacity: .6;
    filter: blur(6px);
    animation: move 1s infinite ease-out;
  }
}

@keyframes move {
  0% {
    transform: translate(-200px, -200px) rotate(45deg);
  }
  100% {
    transform: translate(200px, 200px) rotate(45deg);
  }
}
</style>