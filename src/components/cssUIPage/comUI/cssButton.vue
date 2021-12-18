<!--
 * @Author: zxy
 * @Date: 2021-08-17 13:20:22
 * @LastEditTime: 2021-12-18 16:54:41
 * @FilePath: /sku-blog-vite/src/components/cssUIPage/comUI/cssButton.vue
-->
<template>
  <main>
    <v-md-preview text="# 纯CSS按钮样式demo 点击按钮显示源码"></v-md-preview>
    <!-- 遮罩按钮 -->
    <content-line title="hover 渐变效果（遮罩）按钮"></content-line>

    <div class="show-button-box">
      <div class="button-container-1">
        <span class="mas">MASK1</span>
        <button @click="awaShowFlag = 0"
        id="work" type="button" name="Hover">MASK1</button>
      </div>

      <div class="button-container-2">
        <span class="mas">MASK2</span>
        <button @click="awaShowFlag = 1" 
        type="button" name="Hover">MASK2</button>
      </div>

      <div class="button-container-3">
        <span class="mas">MASK3</span>
        <button @click="awaShowFlag = 2" 
        type="button" name="Hover">MASK3</button>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <v-md-preview
        :text="awaButtonFText"
        v-if="awaShowFlag === 0"
      ></v-md-preview>
      <v-md-preview
        :text="awaButtonSText"
        v-else-if="awaShowFlag === 1"
      ></v-md-preview>
      <v-md-preview
        :text="awaButtonTText"
        v-else-if="awaShowFlag === 2"
      ></v-md-preview>
    </transition>
    <transition name="fade">
      <v-md-preview
        :text="awaButtonText"
        v-if="awaShowFlag >= 0"
      ></v-md-preview>
    </transition>
    <!-- 遮罩按钮end -->

    <!-- 漫画按钮 -->
    <content-line title="hover 漫画风按钮"></content-line>

    <div class="show-button-box">
      <button class="btn btn--stripe" @click="changeManShow(1)">Button</button>
      <div class="btn btn--stripe" @click="changeManShow(1)">Link</div>
      <button class="btn btn--stripe btn--radius" @click="changeManShow(1)">
        Aggressive Radius
      </button>
      <button class="btn btn--stripe btn--large" @click="changeManShow(1)">
        Large Button
      </button>
    </div>

    <transition name="fade">
      <v-md-preview
        :text="manButtonText"
        v-if="mangaShowFlag >= 0"
      ></v-md-preview>
    </transition>
    <!-- 漫画按钮end -->

    <!-- Shiney！ -->
    <content-line title="Shiney"></content-line>

    <div @click="changeShineyShow(1)" class="shiney-button">Shiney!</div>

    <transition name="fade">
      <v-md-preview
        :text="shineyText"
        v-if="shineyShowFlag >= 0"
      ></v-md-preview>
    </transition>
    <!-- Shiney end -->
  </main>
</template>

<script>
import { reactive, toRefs } from "vue";
import contentLine from "../../contentLine/contentLine.vue";

export default {
  setup() {
    const state = reactive({
      // 遮罩按钮
      // 遮罩按钮显示源码
      awaShowFlag: -1,
      awaButtonText: `
dom结构
\`\`\`html
<div class="button-container-1">
  <span class="mas">MASK1</span>
  <button id="work" type="button" name="Hover">MASK1</button>
</div>
\`\`\`

公共样式
\`\`\`css
@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");
@import url("https://fonts.googleapis.com/css?family=Roboto:100");

@mixin button($bcolor, $url, $x1, $y1, $bor, $col) {
  background: $bcolor;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}

@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}

@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

a {
  color: #00ff95;
}

.mas {
  position: absolute;
  color: #000;
  text-align: center;
  width: 101%;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 17px;
  overflow: hidden;
  font-weight: bold;
}

\`\`\`
      `,
      awaButtonFText: `
按钮样式
\`\`\`css
.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6vh;
  overflow: hidden;
  border: 1px solid;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png",
      2300%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(22) forwards;
    animation: ani2 0.7s steps(22) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(22) forwards;
      animation: ani 0.7s steps(22) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=（段数+1）*100%
:::
`,
      awaButtonSText: `按钮样式
\`\`\`css
.button-container-2 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7vh;
  overflow: hidden;
  border: 1px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png",
      3000%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(29) forwards;
      animation: ani 0.7s steps(29) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=（段数+1）*100%
:::`,
      awaButtonTText: `按钮样式
\`\`\`css
.button-container-3 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8vh;
  overflow: hidden;
  border: 1px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png",
      7100%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(70) forwards;
    animation: ani2 0.7s steps(70) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(70) forwards;
      animation: ani 0.7s steps(70) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=（段数+1）*100%
:::`,
      /**
       * @description: 根据点击显示源码
       * @param {number} index
       * @return {*}
       */
      changeAwaShow: (index) => {
        if (index === state.awaShowFlag) {
          state.awaShowFlag = -1;
        } else {
          state.awaShowFlag = index;
        }
      },
      // 遮罩按钮end
      // 漫画风按钮
      mangaShowFlag: -1,
      manButtonText: `
dom结构
\`\`\`html
<button class="btn btn--stripe">Button</button>
<div class="btn btn--stripe">Link</div>
<button class="btn btn--stripe btn--radius">
  Aggressive Radius
</button>
<button class="btn btn--stripe btn--large">
  Large Button
</button>
\`\`\`

按钮样式代码
\`\`\`css
$man-color-gray: #666;
$man-color-black: #000;
$man-stripe-height: 7px;
$man-btn-color: $man-color-gray;
$man-btn-background: #fff;
$man-btn-color-hover: #fff;
$man-btn-background-hover: $man-color-gray;
$man-border-color: $man-color-gray;
$man-border-color-hover: $man-color-black;

@mixin reset-button {
  overflow : visible;
  margin : 0;
  padding : 0;
  border : 0;
  background : transparent;
  font : inherit;
  line-height : normal;
  cursor : pointer;
  -moz-user-select : text;
  
  &:-moz-focus-inner {
    padding : 0;
    border : 0;
  }
}

@keyframes stripe-slide {
  0% { background-position: 0% 0; }
  100% { background-position: 100% 0; }
}

.btn {
  @include reset-button;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  padding: 16px 36px 22px;
  background-color: $man-btn-background;
  color: $man-btn-color;
  border: 2px solid $man-border-color;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all .5s ease;
  margin: 0 30px 30px;
  
  &--stripe {
    overflow: hidden;
    position: relative;
    
    &:after {
      content: '';
      display: block;
      height: $man-stripe-height;
      width: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        $man-border-color,
        $man-border-color 1px,
        transparent 2px,
        transparent 5px
      );
      backface-visibility: hidden;
      border-top: 1px solid $man-border-color;
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: $man-stripe-height $man-stripe-height;
    }

    &:hover {
      background-color: $man-btn-background-hover;
      color: $man-btn-color-hover;
      border-color: $man-border-color-hover;

      &:after {
        background-image: repeating-linear-gradient(
          45deg,
          $man-btn-color-hover,
          $man-btn-color-hover 1px,
          transparent 2px,
          transparent 5px
        );
        border-top: 1px solid $man-border-color-hover;
        animation: stripe-slide 12s infinite linear forwards;
      }
    }
  }
  
  &--large {
    width: 50%;
  }
  
  &--radius {
    border-radius: 36px;
  }
}
\`\`\`
:::tip
核心为\`repeating-linear-gradient\`线性函数，通过变化位置实现动态效果
:::
      `,
      /**
       * @description: 根据点击显示源码
       * @param {number} index
       * @return {*}
       */
      changeManShow: (index) => {
        if (index === state.mangaShowFlag) {
          state.mangaShowFlag = -1;
        } else {
          state.mangaShowFlag = index;
        }
      },
      // 漫画风end
      // shiney!
      shineyShowFlag: -1,
      /**
       * @description: 根据点击显示源码
       * @param {number} index
       * @return {*}
       */
      changeShineyShow: (index) => {
        if (index === state.shineyShowFlag) {
          state.shineyShowFlag = -1;
        } else {
          state.shineyShowFlag = index;
        }
      },
      shineyText: `
dom结构
\`\`\`html
<div class="shiney-button">Shiney!</div>
\`\`\`

按钮样式
\`\`\`css
$shiney-color: #2194E0;

.shiney-button {
  padding: 0.75em 2em;
  text-align: center;
  text-decoration: none;
  color: $shiney-color;
  border: 2px solid $shiney-color;
  font-size: 24px;
  display: inline-block;
  border-radius: 0.3em;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin: 0 30px 30px;

  &:before {
    content: "";
    background-color: rgba(255,255,255,0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -4.5em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }

  &:hover {
    background-color: $shiney-color;
    color: #fff;
    box-shadow: 0 4px 0px darken($shiney-color, 10%);
    
    &:before {
      transform: skewX(-45deg) translateX(13.5em);
      transition: all 0.5s ease-in-out;
    }
  }
}
\`\`\`

:::tip
核心为\`skewX(-45deg)\`将before元素变形后藏在可视区域外，触发hover滑动
:::
      `,
      // shiney end
    });

    return {
      ...toRefs(state),
    };
  },
  components: {
    contentLine,
  },
};
</script>

<style lang="scss" scoped>
// 源码进入过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

// 展示盒
.show-button-box { 
  display: flex;
  align-items: center;
  margin-bottom: 10px
}

// 遮罩按钮效果
@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");
@import url("https://fonts.googleapis.com/css?family=Roboto:100");

@mixin button($bcolor, $url, $x1, $y1, $bor, $col) {
  background: $bcolor;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}

@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}

@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

a {
  color: #00ff95;
}

.mas {
  position: absolute;
  color: #000;
  text-align: center;
  width: 101%;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 17px;
  overflow: hidden;
  font-weight: bold;
}

.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  margin: 0 30px;
  border: 1px solid;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png",
      2300%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(22) forwards;
    animation: ani2 0.7s steps(22) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(22) forwards;
      animation: ani 0.7s steps(22) forwards;
    }
  }
}

.button-container-2 {
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 30px;
  overflow: hidden;
  border: 1px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png",
      3000%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(29) forwards;
      animation: ani 0.7s steps(29) forwards;
    }
  }
}

.button-container-3 {
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 30px;
  overflow: hidden;
  border: 1px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(
      #000,
      "https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png",
      7100%,
      100%,
      none,
      #fff
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(70) forwards;
    animation: ani2 0.7s steps(70) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(70) forwards;
      animation: ani 0.7s steps(70) forwards;
    }
  }
}
// 遮罩按钮效果end

// 漫画按钮效果
$man-color-gray: #666;
$man-color-black: #000;
$man-stripe-height: 7px;
$man-btn-color: $man-color-gray;
$man-btn-background: #fff;
$man-btn-color-hover: #fff;
$man-btn-background-hover: $man-color-gray;
$man-border-color: $man-color-gray;
$man-border-color-hover: $man-color-black;

@mixin reset-button {
  overflow: visible;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  line-height: normal;
  cursor: pointer;
  -moz-user-select: text;

  &:-moz-focus-inner {
    padding: 0;
    border: 0;
  }
}

@keyframes stripe-slide {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.btn {
  @include reset-button;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  padding: 16px 36px 22px;
  background-color: $man-btn-background;
  color: $man-btn-color;
  border: 2px solid $man-border-color;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.5s ease;
  margin: 0 30px 30px;

  &--stripe {
    overflow: hidden;
    position: relative;

    &:after {
      content: "";
      display: block;
      height: $man-stripe-height;
      width: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        $man-border-color,
        $man-border-color 1px,
        transparent 2px,
        transparent 5px
      );
      backface-visibility: hidden;
      border-top: 1px solid $man-border-color;
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: $man-stripe-height $man-stripe-height;
    }

    &:hover {
      background-color: $man-btn-background-hover;
      color: $man-btn-color-hover;
      border-color: $man-border-color-hover;

      &:after {
        background-image: repeating-linear-gradient(
          45deg,
          $man-btn-color-hover,
          $man-btn-color-hover 1px,
          transparent 2px,
          transparent 5px
        );
        border-top: 1px solid $man-border-color-hover;
        animation: stripe-slide 12s infinite linear forwards;
      }
    }
  }

  &--large {
    width: 50%;
  }

  &--radius {
    border-radius: 36px;
  }
}
// 漫画按钮效果end

// shiney!
$shiney-color: #2194e0;

.shiney-button {
  padding: 0.75em 2em;
  text-align: center;
  text-decoration: none;
  color: $shiney-color;
  border: 2px solid $shiney-color;
  font-size: 24px;
  display: inline-block;
  border-radius: 0.3em;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin: 0 30px 30px;

  &:before {
    content: "";
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -4.5em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }

  &:hover {
    background-color: $shiney-color;
    color: #fff;
    box-shadow: 0 4px 0px darken($shiney-color, 10%);

    &:before {
      transform: skewX(-45deg) translateX(13.5em);
      transition: all 0.5s ease-in-out;
    }
  }
}
// shiney end
</style>
