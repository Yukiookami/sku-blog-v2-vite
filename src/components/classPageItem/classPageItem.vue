<template>
  <article class="main-item">
    <!-- 头像 -->
    <div @click="go" class="item-icon">
      <img :src="cover" alt="">
      <!-- 侧边显示 -->
      <div class="create-msg">
        <span>
          <img class="time" src="../../assets/img/fontIcon/time.svg" alt="">
          {{timeText}}{{createTime}}</span>
        <span>
          <i class="el-icon-user"></i>
          作者：{{author}}
        </span>
      </div>
    </div>

    <!-- 文章主体 -->
    <div @click="go" class="sen-box">
      <h2 class="sen-title">{{title}}</h2>
      <div class="sen-content">{{content}}</div>
    </div>

    <hr class="sen-line">
  </article>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { goToPage } from '../../assets/js/common'
import store from '../../store'

export default {
  // 封面，id，时间，标题，作者，内容
  props: ['cover', 'id', 'createTime', 'title', 'author', 'content', 'contentType'],
  setup (props) {
    const state = reactive({
      lang: computed(() => store.state.langFlag),
      timeText: computed(() => {
        if (!state.lang) {
          return '时间：发布于 '
        } else {
          return '時間：作成日 '
        }
      }),
      /**
       * 跳转到文章页面，点击时触发
       *
       * @event
       *
       */
      go: () => {
        goToPage('article', props.id, props.contentType)
      },
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

// 主区域
.main-item {
  font-family: $font-f;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 60px;
  margin-bottom: 20px;
  height: 162px;

  &:hover {
    .item-icon {
    // 显示作者和时间
      .create-msg {
        opacity: 1;
        transform: translateX(-110px);
      }
    }

    // 文章
    .sen-box {
      .sen-title  {
        color: $color-blog-yel;
      }
    }
  }

  // 头像
  .item-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &>img {
      overflow: hidden;
      width: 100px;
      height: 100px;
      border: 1px solid #dadada;
      border-radius: 50%;
      padding: 2px;
      user-select: none;
      object-fit: cover;
    }

    // 作者和时间
    .create-msg {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 200px;
      top: 10px;
      color: #8d8d8d;
      z-index: 999;
      font-size: 12px;
      line-height: 20px;
      opacity: 0;
      transform: translateX(0);
      transition: all .3s ease-in-out;

      &::before {
        content: '';
        display: block;
        background-color: #dadada;
        height: 1px;
        width: 170px;
        margin-bottom: 26px;
      }

      .time {
        margin-right: 4px;
        width: 10px;
      }
    }

    // 显示作者和时间
    .show-msg {
      opacity: 1;
      transform: translateX(100px);
    }
  }

  // 文章
  .sen-box {
    width: calc(100% - 140px);
    color: #504e4e;
    cursor: pointer;

    .sen-title  {
      margin: 0 0 20px 0;
      transition: all .5s ease-in-out;
    }

    .sen-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 30px;
      color: #7b7b7b;
      height: 60px;
      font-size: 15px;
      text-overflow: ellipsis;
    }
  }

  // 底部线
  .sen-line {
    position: absolute;
    bottom: 0;
    width: 30%;
    height: 1px;
    left: calc(50% - 15%);
    border: 0;
    background: #efefef;
  }
}
</style>
