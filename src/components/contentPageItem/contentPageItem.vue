<template>
  <div class="content-page-item-sec"
  :class="{'chage-content-page-item-sec': itemExtent}"
  v-if="!(index % 2)"
  @mouseenter="changeItem"
  @mouseleave="changeItem">
    <div class="content-page-item-content-box">
      <div class="content-box-create-time">
        <img src="../../assets/img/fontIcon/time.svg" alt="">
        <span>{{timeText}}{{createTime}}</span>
      </div>

      <h3 @click="goToContentPage" class="content-box-title">
        {{title}}
      </h3>

      <!-- 标签 -->
      <div class="content-box-tag-sec">
        <content-page-item-tag v-for="(item, index) in tag" :key="`tag${index}`"
        :tagName="item"></content-page-item-tag>
      </div>

      <p @click="goToContentPage" class="content-box-content">
        {{content}}
      </p>

      <div @click="goToContentPage" class="content-box-dot">
        <img src="../../assets/img/fontIcon/dot.svg" alt="">
      </div>
    </div>

    <div @click="goToContentPage" class="content-page-item-image-box">
      <img :src="cover" alt="">
    </div>
  </div>

  <div class="content-page-item-sec" v-else
  :class="{'chage-content-page-item-sec': itemExtent}"
  @mouseenter="changeItem"
  @mouseleave="changeItem">
    <div @click="goToContentPage" class="content-page-item-image-box">
      <img :src="cover" alt="">
    </div>

    <div class="content-page-item-content-box content-box-flex-right">
      <div class="content-box-create-time">
        <img src="../../assets/img/fontIcon/time.svg" alt="">
        <span>{{timeText}}{{createTime}}</span>
      </div>

      <h3 @click="goToContentPage" class="content-box-title">
        {{title}}
      </h3>

      <!-- 标签 -->
      <div class="content-box-tag-sec">
        <content-page-item-tag v-for="(item, index) in tag" :key="`tag${index}`"
        :tagName="item"></content-page-item-tag>
      </div>

      <p @click="goToContentPage" class="content-box-content">
        {{content}}
      </p>

      <div @click="goToContentPage" class="content-box-dot">
        <img src="../../assets/img/fontIcon/dot.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import contentPageItemTag from './contentPageItemTag/contentPageItemTag.vue'
import { useRouter } from 'vue-router'
// 引入router对象
import Router from '../../router'
import { goToPage } from '../../assets/js/common'
import store from '../../store'

export default {
  props: ['createTime', 'title', 'tag', 'content', 'cover', 'id', 'index', 'contentType'],
  setup (props) {
    // 定义路由
    const router = useRouter()

    Router.beforeEach((to, from, next) => {
      /* 路由发生变化修改页面title */
      if (to.meta.title === "文章页面" && props.title) {
        document.title = props.title
      } else {
        document.title = to.meta.title
      }
      next()
    })

    const state = reactive({
      lang: computed(() => store.state.langFlag),
      timeText: computed(() => {
        if (!state.lang) {
          return '发布于 '
        } else {
          return '作成日 '
        }
      }),
      /**
       * 跳转到文章页面，点击时触发
       *
       * @event
       *
       */
      goToContentPage: () => {
        goToPage('article', props.id, props.contentType)
      },
      itemExtent: false,
      /**
       * 鼠标放上更改样式，鼠标放入移出触发
       *
       * @event
       */
      changeItem: () => {
        state.itemExtent = !state.itemExtent
      }
    })

    return {
      ...toRefs(state),
    }
  },
  components: {
    contentPageItemTag
  }
}
</script>

<style lang="scss" scoped>
.content-page-item-sec {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 40px 0;
  height: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, .4);
  border-radius: 15px;
  transition: all .5s ease-in-out;

  // 左边文本
  .content-page-item-content-box {
    width: 40%;
    padding: 0 2.5%;
    margin: 20px 10px 0;

    // 发布时间
    .content-box-create-time {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #888;

      img {
        width: 14px;
        margin-right: 5px;
      }
    }

    // 标签
    .content-box-tag-sec {
      display: flex;
    }

    // 标题
    .content-box-title {
      overflow: hidden;
      // width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #504E4E;
      font-weight: normal;
      cursor: pointer;
    }

    // 内容
    .content-box-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      line-height: 23px;
      color: #504E4E;
      height: 87.5px;
      font-size: 15px;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    // 省略号
    .content-box-dot {
      cursor: pointer;
      width: 25px;

      img {
        width: 100%;
      }
    }
  }

  .content-box-flex-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  // 右边图片
  .content-page-item-image-box {
    overflow: hidden;
    width: 55%;
    height: 300px;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: all .5s ease-in-out;
    }
  }
}

.chage-content-page-item-sec {
  box-shadow: 0 0 10px rgba(0, 0, 0, .8);

  .content-page-item-image-box {
    img {
      transform-origin: center;
      transform: scale(1.1);
    }
  }
}
</style>
