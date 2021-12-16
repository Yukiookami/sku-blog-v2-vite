<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <div class="sen-main-sec" :class="{'change-height': !emptyFlag}">
      <header class="header-banner">
        <img :src="classObj.typeCover" alt="">

        <div class="sen-cover-title-box">
          <h1>{{classObj.keyword}}</h1>
        </div>
      </header>

      <section v-if="!emptyFlag" class="class-sen-sec">
        <class-page-item v-for="(item, index) in classObj.contentList"
        :key="`classPageItem${index}`" :cover="item.coverImg"
        :id="item.id" :createTime="item.date" :title="item.title"
        :author="item.sakusya" :content="item.content" :contentType="item.contentType"></class-page-item>
      </section>
    </div>

    <!-- 空状态 -->
    <div v-if="emptyFlag" class="empty-box">
      <el-empty :image-size="200" 
      :image="`${empty}`"
      :description="descriptionText"></el-empty>
    </div>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
// import { setYome } from '../assets/js/yome'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'
// classPageItem
import classPageItem from '../components/classPageItem/classPageItem.vue'
// 引入base64
import Base64 from '../assets/js/base64'
// 引入公用ts
import { timeChange } from '../assets/js/common'
import store from '../store'

// 引入图片
import typeCoverBack from '../assets/img/search/type-cover-1.jpeg'
import empty from '../assets/img/statusImg/empty-22.png'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome

    const state = reactive({
      // keyword
      keyword: computed(() => Base64.decode(route.query.id)),
      // 语言类型
      langFlag: computed(() => store.state.langFlag),
      // 文章数据
      classObj: {
        keyword: computed(() => state.keyword),
        typeCover: typeCoverBack,
        contentList: []
      },
      // 搜索结果数组
      searchList: [],
      // 搜索结果为空
      emptyFlag: false,
      // 空文字
      descriptionText: '什么都没有找到',
      /**
       * 根据keyword请求数据
       */
      getSen: () => {
        proxy.$http.get(`${API}api/content/searchContent?keyword=${state.keyword}&&langFlag=${state.langFlag}`)
          .then((res) => {
            let list = res.data.list
            state.searchList = list.flat()

            if (state.searchList.length) {
              state.emptyFlag = false
  
              state.changeContentByLang(state.searchList)
            } else {
              state.emptyFlag = true
            }
          })
      },
      /**
       * @description: 根据语言更改文章内容
       * @param {*} arr
       * @return {*}
       */ 
      changeContentByLang: (arr) => {
        let lang = store.state.langFlag
        let newArr = []

        arr.forEach((ele) => {
          let { cnContentInfo, jaContentInfo } = ele

          if (!lang) {
            cnContentInfo.date = timeChange(cnContentInfo.date)
            cnContentInfo.id = ele._id
            newArr.push(cnContentInfo)
          } else {
            jaContentInfo.id = ele._id
            jaContentInfo.date = timeChange(jaContentInfo.date)
            newArr.push(jaContentInfo)
          }
        })

        state.classObj.contentList = newArr
      }
    })

    onMounted(() => {
      // 设置并监听标题
      if(state.keyword) {
        document.title = state.keyword
      }

      watch(() => state.keyword,
      keyword => {
        if(keyword) {
          document.title = keyword
          state.getSen()
        }
      })

      watch(() => store.state.langFlag, (lang) => {
        if (!lang) {
          state.descriptionText = '什么都没有找到'
        } else {
          state.descriptionText = 'ここには何もないです'
        }

        state.getSen()
      })

      state.getSen()
    })

    return {
      ...toRefs(state),
      empty
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress,
    classPageItem
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

.change-height {
  min-height: calc(100vh - 248.3px);
}

// 主区域
.sen-main-sec {
  
  .header-banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 400px;

    img {
      object-fit: cover;
      width: 100%;
      pointer-events: none;
      user-select: none;
    }

    .sen-cover-title-box {
      font-family: $font-f;
      position: absolute;
      color: #fff;
      font-size: 30px;
      text-shadow: 0 0 10px rgba(0, 0, 0, 1);
      letter-spacing: 2px;

      h1 {
        font-weight: normal;
      }
    }
  }

  // 文章区域
  .class-sen-sec {
    width: 780px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
  }
}

// 空状态
.empty-box {
  width: calc(80vw);
  margin: 20px auto 0;
  height: calc(100vh - 619px);
  box-shadow: 0 0 5px #e5e9ef;
  border-radius: 30px;
  background-repeat: no-repeat;
  background-position: 75% 100%;
  background-image: url('../assets/img/statusImg/jingle.png')
}
</style>
