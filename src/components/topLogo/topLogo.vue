<template>
  <div class="top-nav-logo">
    <router-link class="top-nav-link-box" to="/">
      <span>SKU</span>
      <img ref="logoKitune" v-if="nowCont === 0" src="../../assets/logo-blog-0.png" alt="">
      <!-- <img ref="logoKitune" v-else-if="nowCont === 1" src="../../assets/logo-blog-1.png" alt="">
      <img ref="logoKitune" v-else-if="nowCont === 2" src="../../assets/logo-blog-2.png" alt=""> -->
    </router-link>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch } from 'vue'

export default {
  props: ['moveYou'],
  setup (props) {
    let logoKitune = ref(null)

    const state = reactive({
      // 计时器
      timer: '',
      // 当前计数
      nowCont: 0,
      /**
       * 让小狐狸动起来
       */
      runKitune: () => {
        // let cont = 0
        // let junbanFlag = 0

        // state.timer = setInterval(() => {
        //   if (cont === 2) {
        //     cont--
        //     junbanFlag = 0
        //   } else if (cont === 0) {
        //     cont++
        //     junbanFlag = 1
        //   } else if (junbanFlag) {
        //     cont++
        //   } else {
        //     cont--
        //   }

        //   if (logoKitune.value) {
        //     state.nowCont = cont
        //   } else {
        //     clearInterval(state.timer)
        //   }
        // }, 150)
      },
      /**
       * 让小狐狸停下
       */
      stopKitune: () => {
        // clearInterval(state.timer)
      }
    })

    watch(() => props.moveYou,
      moveYou => {
        if (moveYou) {
          state.runKitune()
        } else {
          state.stopKitune()
        }
      }
    )

    return {
      ...toRefs(state),
      logoKitune
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';
// logo
.top-nav-logo {
width: 110px;

  .top-nav-link-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: $font-f-a;
    text-decoration: none;

    img {
      width: 40%;
    }

    span {
      display: block;
      padding: 10px;
      font-size: 22px;
      margin-right: 5px;
      color: rgba(0, 0, 0, .6);
      background-color: rgba(255,255,255,.5);
      border-radius: 10px;
      transition: all .5s ease-in-out;
    }
  }

  &:hover {
    span {
      background-color: $color-blog-yel;
      color: #fff;
    }
  }
}
</style>
