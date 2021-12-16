<template>
  <div>
    <div class="image-layer">
      <img :src="url" :style="`transform: scale(${scale}) translate(${tranX}px, ${tranY}px) rotate(${rot}deg);
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

<script>
  export default {
    // 图片url，缩放，位移x，位移y，旋转角度，透明度, 最大宽，最大高，当前宽，当前高，模糊
    props: ["url", "scale", "tranX", "tranY", "rot", "opacity", "width", "height", "nowWidth", "nowHeight", "blur"]
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