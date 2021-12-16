<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <div class="sen-main-sec">
      <header class="header-banner">
        <img :src="classObj.typeCover" alt="">

        <div class="sen-cover-title-box">
          <h1>{{classObj.typeName}}</h1>
        </div>
      </header>

      <section class="class-sen-sec">
        <class-page-item v-for="(item, index) in classObj.contentList"
        :key="`classPageItem${index}`" :cover="item.coverImg"
        :id="item.id" :createTime="item.date" :title="item.title"
        :author="item.sakusya" :content="item.content" :contentType="contentType"></class-page-item>
      </section>
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
// 引入公用ts
import { timeChange } from '../assets/js/common'
// 引入Base64
import Base64 from '../assets/js/base64'
import store from '../store'

export default {
  setup () {
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome

    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      lang: computed(() => store.state.langFlag),
      // id
      id: computed(() => Base64.decode(route.query.id)),
      // type
      contentType: computed(() => Base64.decode(route.query.type)),
      // 文章数据
      classObj: {},
      // 存储请求结果
      typeRes: '',
      contentRes: '',
      /**
       * 根据id请求类型与文章
       */
      getSen: () => {
        proxy.$http.get(`${API}api/typeClass/getTypeClassById?id=${state.id}`)
          .then((res) => {
            state.typeRes = res
            state.changeTypeByLang(res)

            state.getConent()
          })
      },
      /**
       * @description: 根据类型名称请求文章数据
       * @param {*}
       * @return {*}
       */ 
      getConent: () => {
        proxy.$http.get(`${API}api/content/getContentByTypeName?typeName=${state.classObj.typeName}&&contentType=${state.contentType}&&lang=${state.lang}`)
          .then((res) => {
            state.contentRes = res.data.list
            state.changeContentByLang(res.data.list)
          })
      },    
      /**
       * @description: 根据语言更改type内容
       * @param {*} res
       * @return {*}
       */      
      changeTypeByLang: (res) => {
        let lang = store.state.langFlag
        let { cnTypeClassInfo, jaTypeClassInfo } = res.data.data

        if (!lang) {
          // 中文
          state.classObj = cnTypeClassInfo
        } else {
          // 日语
          state.classObj = jaTypeClassInfo
        }
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
      if(state.classObj.typeName) {
        document.title = state.classObj.typeName
      }

      watch(() => state.classObj,
      classObj => {
        if(classObj.typeName) {
          document.title = classObj.typeName
        }
      })

      watch(() => store.state.langFlag,
      () => {
        state.changeTypeByLang(state.typeRes)
        state.changeContentByLang(state.contentRes)
      })
        
      // 请求
      state.getSen()
    })

    return {
      ...toRefs(state),
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

// 主区域
.sen-main-sec {
  min-height: calc(100vh - 248.3px);

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
</style>
