<template>
  <!-- 判断位置 -->
  <div ref="indexListBox"></div>

  <div class="index-list-box" ref="parentOfTitleDom"
  :class="{'get-top': getTop}">
    <!-- 每一段目录盒子 -->
    <div class="index-list-box-item"
    v-for="(item, index) in senArr" :key="`indexListBox${index}`">
      <!-- tag标题 -->
      <h2 :ref="indexTitleDom" @click="goTo(index, 0, 1)" :class="{'show-h2': comTitleIndex === index}">{{item.typeName}}</h2>
      <!-- 文章标题 -->
      <div class="hide-content"
      :class="{'show-content': comTitleIndex === index}">
        <!-- 限制只能显示几个 -->
        <template v-for="(contentItem, contentItemIndex) in item.contentList" :key="`item${contentItemIndex}`">
          <span @click="goTo(index, contentItemIndex, 0)" :class="{'show-span': comContentIndex === contentItemIndex && comTitleIndex === index}"
          v-if="!limt || contentItemIndex < limt" >
            {{contentItem.title}}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onBeforeUpdate, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { handleScroll, throttle } from '../../assets/js/common'
import indexListItem from './indexListItem/indexListItem.vue'

export default {
  // 目录数组，标题索引，文章索引，数组长度
  props: ['senArr', 'titleIndex', 'contentIndex', 'numberList', 'limt'],
  emits: ['goTo'],
  setup (props, context) {
    const indexListBox = ref(null)
    const parentOfTitleDom = ref(null)

    const state = reactive({
      getTop: false,
      // 最大高度
      topH: 0,
      /**
       * 监听是否触顶
       */
      listenPageTop: () => {
        // 监听上下滑动
          state.checkScrollFlag = handleScroll()

        if (indexListBox.value) {
          let winTop = indexListBox.value.getBoundingClientRect().top

          if (winTop < 70) {
            state.getTop = true
          } else {
            state.getTop = false
          }
        }
      },
      /**
       * 获得标题index，并且监听是否在显示范围内
       */
      comTitleIndex: computed(() => props.titleIndex),
      // 文章index
      comContentIndex: computed(() => {
        let nowContentIndex = props.contentIndex
        let nowIndex = state.comTitleIndex

        if (!(nowIndex - 1)) {
          return Math.abs(nowContentIndex - props.numberList[0])
        } else if (nowIndex) {
          let indexSum = props.numberList.reduce((prev, cur, index) => {
            if (index < nowIndex) {
              return prev + cur
            } else {
              return prev
            }
          })

          return nowContentIndex - indexSum
        } else {
          return nowContentIndex
        }
      }),
      /**
       * 触发父元素跳转方法
       */
      goTo: (index, contentIndex, titleFlag) => {
        context.emit("goTo", index, contentIndex, titleFlag)
      },
      // 判断上滑还是下滑
      checkScrollFlag: 0,
      /**
       * 获取子元素与父元素的距离
       *
       * @param {number} nowIndex
       */
      checkDo: (nowIndex) => {
        indexTitleDomArr.forEach((ele, index) => {
          let top = ele.offsetTop
          if (ele.offsetTop > 100 && index === nowIndex && !state.checkScrollFlag) {
            state.goToTop(top)
          } else if (ele.offsetTop < 100 && index === nowIndex && state.checkScrollFlag) {
            state.goToTop(top)
          }
        })
      },
      /**
       * 滚动到父元素顶部
       * @event
       *
       * @param {number} top
       */
      goToTop: (top) => {
        parentOfTitleDom.value.scrollTop = top
      },
      /**
       * @description: 进行节流操作
       * @param {*}
       * @return {*}
       */
      throttleFun: '',
    })

    // 获得锚点元素
    let indexTitleDomArr = []

    const indexTitleDom = ref((e) => {
      if (e) {
        indexTitleDomArr.push(e)
      }
    })

    onBeforeUpdate (() => {
      indexTitleDomArr = []
    })

    onMounted(() => {
      state.topH = indexListBox.value.getBoundingClientRect().top

      state.throttleFun = throttle(state.listenPageTop, 10)

      window.addEventListener('scroll', state.throttleFun, true)

      watch(() => state.comTitleIndex,
      (comTitleIndex) => {
        state.checkDo(comTitleIndex)
      })
    })

    onBeforeUnmount(() => {
      // 销毁滚动事件
      window.removeEventListener('scroll', state.throttleFun, true)
    })

    return {
      ...toRefs(state),
      indexListBox,
      indexTitleDom,
      parentOfTitleDom
    }
  },
  components: {
    indexListItem
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.index-list-box {
  overflow: hidden;
  // height: calc(100vh - 200px);
  height: 900px;
  width: 200px;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: scroll;
  // background-color: #000;

  &::-webkit-scrollbar {
    width: 0px;
  }

  // 目录盒子
  .index-list-box-item {
    font-family: $font-f;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    // tittle标题
    h2 {
      font-size: 18px;
      margin: 0 0 5px 0;
      padding: 5px 8px;
      background-color: #fff;
      border-radius: 5px;
      transition: all .5s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: rgba(248, 186, 11, 1);
        color: #fff;
      }
    }

    .show-h2 {
      background-color: rgba(248, 186, 11, 1);
      color: #fff;
    }

    // 文章标题盒子
    .hide-content {
      overflow: hidden;
      height: 0;

      // 文章标题
      span {
        overflow: hidden;
        display: block;
        font-size: 12px;
        margin: 5px 0 5px 10px;
        padding: 3px 5px;
        border-radius: 5px;
        color: #666;
        height: 1em;
        line-height: 1em;
        transition: all .5s ease-in-out;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

        &:hover {
          background-color: rgba(248, 186, 11, .7);
          color: #fff;
        }
      }

      .show-span {
        background-color: rgba(248, 186, 11, .7);
        color: #fff;
      }
    }

    // 显示文章标题盒子
    .show-content {
      height: 100%;
    }
  }
}

.get-top {
  position: fixed;
  top: 70px;
  right: calc((100vw - 800px) / 2 - 252px);
}
</style>
