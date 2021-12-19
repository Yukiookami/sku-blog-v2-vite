<!--
 * @Author: zxy
 * @Date: 2021-04-20 21:46:24
 * @LastEditTime: 2021-12-19 16:47:27
 * @FilePath: /sku-blog-vite/src/components/banner/2021-haru/imageBox.vue
-->
<template>
  <div>
    <div class="image-layer">
      <img :src="url" @load="loadOver" :style="`transform: scale(${scale}) translate(${tranX}px, ${tranY}px) rotate(${rot}deg);
      opacity: ${opacity}; 
      max-width: ${width}px; 
      min-width: ${width / 2}px; 
      max-height: ${height}px; 
      min-height: ${height / 2}px;
      height: ${nowHeight}px;
      width: ${nowWidth}px;
      filter: blur(${blur}px);`" alt="图层">
    </div>
  </div>
</template>

<script setup>
// 图片url，缩放，位移x，位移y，旋转角度，透明度, 最大宽，最大高，当前宽，当前高，模糊
const props = defineProps({
  url: String, 
  scale: Number, 
  tranX: Number, 
  tranY: Number, 
  rot: Number, 
  opacity: Number, 
  width: Number, 
  height: Number, 
  nowWidth: Number, 
  nowHeight: Number, 
  blur: Number
})

const emit = defineEmits([
  'loadOver'
])

/**
 * @description: 图片加载完毕
 * @param {*}
 * @return {*}
 */
const loadOver = () => {
  emit('loadOver')
}
</script>

<style lang="scss" scoped>
  .image-layer {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: auto;

    img {
      transition: 0.5s ease-out;
    }
  }
</style>