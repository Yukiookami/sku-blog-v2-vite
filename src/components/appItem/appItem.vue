<template>
  <div @click="jump" class="app-item">
    <img class="app-item-cover" :src="cover" alt="">

    <div class="app-item-text-sec">
      <strong class="app-item-name">{{appName}}</strong>
      <span class="pay">{{pay}}</span>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import store from '../../store'

export default {
  // 封面，应用名
  props: ['cover', 'appName', 'isPay', 'router', 'appPackage'],
  setup (props) {
    const state = reactive({
      count: 0,
      lang: computed(() => store.state.langFlag),
      pay: computed(() => {
        if (!props.isPay) {
          if (!state.lang) {
            return '免费'
          } else {
            return '無料'
          }
        } else {
          if (!state.lang) {
            return '付费'
          } else {
            return '有料'
          }
        }
      }),
      /**
       * @description: 跳转
       * @param {*}
       * @return {*}
       */      
      jump: () => {
        if (!props.appPackage) {
          window.open(props.router)
        }
      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.app-item {
  display: flex;
  align-items: center;
  padding: 1px 15px;
  margin: 10px;
  font-family: $font-f;
  height: 80px;
  width: 190px;
  border-radius: 10px;
  // background-color: #303643;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, .7);

    .app-item-cover {
      width: 60px;
      border-radius: 10px;
      border: 1px solid $color-blog-yel;
      padding: 2px;
    }

    .app-item-text-sec {
      .app-item-name {
        color: $color-blog-yel;
      }
    }
  }

  .app-item-cover {
    width: 60px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0);
    padding: 2px;
    transition: all .5s ease-in-out;
  }

  .app-item-text-sec {
    display: flex;
    flex-direction: column;
    margin-left: 15px;

    .app-item-name {
      display: block;
      color: #000;
      font-size: 16px;
      font-weight: 700;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 15px;
      transition: all .3s ease-in-out;
    }

    .pay {
      font-size: 12px;
      color: #9baec8;
    }
  }
}
</style>
