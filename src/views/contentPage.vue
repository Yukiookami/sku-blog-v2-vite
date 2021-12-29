<template>
  <div ref="pageTop" class="content-page">
    <TopNav></TopNav>
    <!-- banner区域 -->
    <BannerHaru
      class="load-from-top"
      v-if="state.pageTag === 'Programming Basics'"
    ></BannerHaru>
    <BannerNatu
      class="load-from-top"
      v-if="state.pageTag === 'Japanese learning'"
    ></BannerNatu>
    <BannerAki
      class="load-from-top"
      v-if="state.pageTag === 'Component Implementation'"
    ></BannerAki>
    <!-- bannerEnd -->
    <BakcTop></BakcTop>
    <TopProgress></TopProgress>

    <section class="main-content-sec">
      <!-- 文章目录 -->
      <div
        ref="indexList"
        v-if="state.contentObject.length"
        class="main-content-index-list-box"
      >
        <IndexLisstSkeleton :loading="state.loading">
          <template #index>
            <IndexList
              v-if="!state.loading"
              :senArr="state.contentObject"
              :titleIndex="state.contentLineIndex"
              :contentIndex="state.contentPageItemIndex"
              :numberList="state.arrLength"
              @goTo="goTo"
              :limt="3"
            ></IndexList>
          </template>
        </IndexLisstSkeleton>
      </div>

      <h1 class="page-title">{{ state.pageTag }}</h1>

      <!-- <transition-group name="empty" mode="out-in" tag="div"> -->
      <ContentLineSkeleton :loading="state.loading">
        <template #line>
          <ContentLine
            title="START:DASH!!"
            v-if="state.contentTopList.length"
            :icon="startIcon"
          ></ContentLine>
        </template>
      </ContentLineSkeleton>

      <!-- 置顶文章 -->
      <div class="page-top-content-sec">
        <ContentTopSkeleton :loading="state.loading">
          <template #content>
            <template
              v-for="item in state.contentTopList"
              :key="`contentTop${item.contentId}`"
            >
              <ContentTop
                class="load-from-bottom"
                :cover="item.coverImg"
                :title="item.title"
                :content="item.content"
                :id="item.contentId"
                :cont="state.contentTopList.length"
                :contentType="state.contentType"
              ></ContentTop>
            </template>
          </template>
        </ContentTopSkeleton>
      </div>

      <!-- 文章 -->
      <div class="page-content-main">
        <ContentMainSkeleton :loading="state.loading">
          <!-- 文章单独区域 -->
          <template #main>
            <div
              class="page-content-sec load-from-bottom"
              v-for="item in state.contentObject"
              :key="`contentObject${item.typeId}`"
            >
              <div class="contentLine">
                <ContentLine
                  :title="item.typeName"
                  :icon="item.typeIcon"
                  :id="item.typeId"
                  :contentType="state.contentType"
                ></ContentLine>
              </div>

              <template
                v-for="(contentItem, contentIndex) in item.contentList"
                :key="`contentItem${contentItem.contentId}`"
              >
                <div class="contentPageItem" v-if="contentIndex < 3">
                  <ContentPageItem
                    :createTime="contentItem.date"
                    :title="contentItem.title"
                    :tag="contentItem.tag"
                    :content="contentItem.content"
                    :cover="contentItem.coverImg"
                    :id="contentItem.contentId"
                    :index="contentIndex"
                    :contentType="state.contentType"
                  ></ContentPageItem>
                </div>
              </template>

              <view-more
                :typeId="item.typeId"
                :contentType="state.contentType"
              ></view-more>
            </div>
          </template>
          <!-- 文章单独区域end -->
        </ContentMainSkeleton>
        <!-- 空状态 -->
        <div
          v-if="!state.contentObject.length && !state.loading"
          class="empty-box"
        >
          <el-empty
            :image-size="200"
            :image="`${empty}`"
            :description="state.descriptionText"
          ></el-empty>
        </div>
      </div>

      <!-- </transition-group> -->
    </section>

    <BlogFooter></BlogFooter>
  </div>
</template>

<script setup>
import {
  computed,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
  ref,
  onBeforeUpdate,
  onBeforeUnmount,
  watch,
} from "vue";
// import { useRouter } from 'vue-router'
// 2021 春
import BannerHaru from "../components/banner/2021-haru/bannerHaru.vue";
// 2021 夏
import BannerNatu from "../components/banner/2021-natu/bannerNatu.vue";
// 2021 秋
import BannerAki from "../components/banner/2021-aki/bannerAki.vue";
// 顶部导航
import TopNav from "../components/nav/topNav.vue";
// 返回顶部小狐狸
import BakcTop from "../components/backTop/backTop.vue";
// 页脚
import BlogFooter from "../components/blogFooter/blogFooter.vue";
// 老婆
// import { setYome } from '../assets/js/yome'
// tag线
import ContentLine from "../components/contentLine/contentLine.vue";
// 置顶文章
import ContentTop from "../components/contentTop/contentTop.vue";
// 文章
import ContentPageItem from "../components/contentPageItem/contentPageItem.vue";
// 目录
import IndexList from "../components/indexList/indexList.vue";
// 进度条
import TopProgress from "../components/topProgress/topProgress.vue";
// 公用ts
import { handleScroll, throttle, timeChange } from "../assets/js/common";
// 初始动画
import "../assets/css/loadAnime.css";
// 查看更多
import viewMore from "../components/viewMore/viewMore.vue";
import store from "../store";

// 空状态
import empty from "../assets/img/statusImg/empty-22.png";
import startIcon from "../assets/img/fontIcon/anchor.svg";
import axios from "axios";

// 骨架
import ContentTopSkeleton from "../components/skeleton/contentPage/contentTopSkeleton.vue";
import ContentLineSkeleton from "../components/skeleton/contentPage/contentLineSkeleton.vue";
import IndexLisstSkeleton from "../components/skeleton/contentPage/indexLisstSkeleton.vue";
import ContentMainSkeleton from "../components/skeleton/contentPage/contentMainSkeleton.vue";

// 老婆
// setYome

const { proxy } = getCurrentInstance();
const API = proxy.$API;

const state = reactive({
  // 页面为空时的描述文字
  descriptionText: "当前页面还没有发布的内容，敬请期待!",
  // 当前语言
  langFlag: computed(() => store.state.langFlag),
  // 当前页面类型
  contentType: "program",
  /**
   * 获取当前页面路由
   */
  pageTag: computed(() => {
    const pageRouter = proxy.$router.currentRoute.value;
    const pageName = pageRouter.path;
    state.contentType = pageRouter.name;
    // 利用计算属性运行请求事件 合理性存疑
    axios.all([getContentData(), getTopContent()]);

    let page = store.state.meunList.find((ele) => ele.router === pageName);
    return page?.pageTitle;
  }),
  // 目录index（大标题）
  contentLineIndex: 0,
  // 目录index（小标题）
  contentPageItemIndex: 0,
  // 判断上滑还是下滑
  checkScrollFlag: 0,
  /**
   * @description: 进行节流操作
   * @param {*}
   * @return {*}
   */
  throttleFun: "",
  // 给indexList传递的数组长度
  arrLength: [],
  // 置顶文章数组
  contentTopList: [],
  // 文章数组
  contentObject: [],
  // 原始数组数据
  motoData: {
    // 原始文章数据
    contentData: [],
    // 原始typeClass数据
    typeClassData: [],
  },
  // 文章内容是否完全加载结束
  loadingContent: false,
  // 顶部内容是否完全加载结束
  loadingTopContent: false,
  // 是否完全加载结束
  loading: computed(() => {
    if (state.loadingContent && state.loadingTopContent) {
      return false;
    } else {
      return true;
    }

    // return true
  }),
});

/**
 * 监听页面顶部，判断是往上还是往下滑动，以及锚点元素，滚动触发
 *
 * @event
 */
const listenPageTop = () => {
  // 判断上下滑动
  state.checkScrollFlag = handleScroll();

  // 更改index
  changeIndex(contentLineArr, 0, 150, -100, state.checkScrollFlag);
  changeIndex(contentPageItemArr, 1, 80, -100, state.checkScrollFlag);
};

/**
 * 改变目录index
 *
 * @param {array} arr
 * @param {number} targetIndex
 * @param {number} max
 * @param {number} min
 * @param {number} scrollFlag
 */
const changeIndex = (arr, targetIndex, max, min, scrollFlag) => {
  Array.prototype.forEach.call(arr, (ele, index) => {
    let topMargin = Math.floor(ele.getBoundingClientRect().top);

    if (topMargin <= max && topMargin >= min) {
      if (!targetIndex) {
        state.contentLineIndex = index;
      } else {
        state.contentPageItemIndex = index;
      }
    }

    if (!targetIndex && scrollFlag) {
      if (topMargin >= max && topMargin <= Math.abs(min * 2)) {
        index - 1 > 0
          ? (state.contentLineIndex = index - 1)
          : (state.contentLineIndex = 0);
      }
    }
  });
};

/**
 * 生成数组长度数组
 */
const setArrLeagth = () => {
  state.arrLength.splice(0);
  Array.prototype.forEach.call(state.contentObject, (ele) => {
    state.arrLength.push(ele.contentList.length);
  });
};

/**
 * 返回初始位置计时器
 *
 * @param {number} top
 * @param {number} time
 */
const setBackTimer = (top, time) => {
  let timer = setInterval(() => {
    let winTop = document.documentElement.scrollTop;
    if (winTop <= top + 240 && winTop >= top - 240) {
      window.scrollTo(0, top + 100);
      clearInterval(timer);
    } else if (winTop > top) {
      window.scrollTo(0, winTop - 40);
    } else {
      window.scrollTo(0, winTop + 40);
    }
  }, time);

  timer;
};

/**
 * 返回指定位置
 *
 * @param {number} index
 * @param {number} contentIndex
 * @param {number} titleFlag
 */
const goToContent = (index, contentIndex, titleFlag) => {
  let top = contentLineArr[index].offsetTop;
  let itemTop = contentPageItemArr[contentIndex].offsetTop;

  if (titleFlag) {
    setBackTimer(top, 5);
  } else {
    setBackTimer(itemTop, 5);
  }
};

/**
 * 接受子组件传参，跳转页面
 * @param {number} index
 * @param {number} contentIndex
 * @param {number} titleFlag
 */
const goTo = (index, contentIndex, titleFlag) => {
  let contentItemIndex = 0;
  if (!index) {
    contentItemIndex = contentIndex;
  } else if (!(index - 1) && titleFlag) {
    contentItemIndex = state.arrLength[0];
  } else if (!(index - 1)) {
    contentItemIndex = contentIndex + state.arrLength[0];
  } else {
    let indexSum = state.arrLength.reduce((prev, cur, redIndex) => {
      if (redIndex < index) {
        return prev + cur;
      } else {
        return prev;
      }
    });

    contentItemIndex = contentIndex + indexSum;
  }

  goToContent(index, contentItemIndex, titleFlag);
};

/**
 * @description: 获得文章数据
 * @param {*}
 * @return {*}
 */
const getContentData = async () => {
  try {
    state.loadingContent = false;
    let contentType = state.contentType;

    const res = await proxy.$http.get(
      `${API}api/content/getAllContent?contentType=${contentType}`
    );

    state.motoData.contentData = res.data.list;

    const typeCalss = await proxy.$http.get(
      `${API}api/typeClass/getAllTypeClass`
    );

    state.motoData.typeClassData = typeCalss.data.list;

    state.loadingContent = true;
    setResData();
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description: 处理获得数据
 * @param {*}
 * @return {*}
 */
const setResData = () => {
  let { contentData, typeClassData } = state.motoData;

  let newData = getFinCityList(contentData);
  let newTypeData = [];

  newData.forEach((ele) => {
    if (!state.langFlag) {
      let typeObj = typeClassData.find((item) => {
        return item.cnTypeClassInfo.typeName === ele[0].typeClass;
      });

      let { cnTypeClassInfo, _id } = typeObj;

      ele.splice(3);

      // 中文
      let obj = {
        typeId: _id,
        ...cnTypeClassInfo,
        contentList: ele,
        lastTime: ele[0].date,
      };

      newTypeData.push(obj);
    } else {
      // 日文
      let typeObj = typeClassData.find((item) => {
        return item.jaTypeClassInfo.typeName === ele[0].typeClass;
      });

      let { jaTypeClassInfo, _id } = typeObj;
      let obj = {
        typeId: _id,
        ...jaTypeClassInfo,
        contentList: ele,
        lastTime: ele[0].date,
      };

      newTypeData.push(obj);
    }
  });

  state.contentObject = newTypeData;

  // 设置目录数组
  setArrLeagth();
};

/**
 * @description: 处理文章数组分组
 * @param {*}
 * @return {*}
 */
const getFinCityList = (oldData) => {
  const s = new Set();

  let newData = [];

  if (!state.langFlag) {
    // 中文
    oldData.forEach((ele) => {
      s.add(ele.cnContentInfo.typeClass);
    });

    newData = Array.from({ length: s.size }, () => []);

    oldData.forEach((ele) => {
      let index = [...s].indexOf(ele.cnContentInfo.typeClass);

      if (typeof ele.jaContentInfo.tag === "string") {
        ele.cnContentInfo.tag = ele.cnContentInfo.tag.split(",");
        ele.cnContentInfo.date = timeChange(ele.cnContentInfo.date);
      }

      let obj = {
        contentId: ele._id,
        ...ele.cnContentInfo,
      };

      newData[index].push(obj);
    });
  } else {
    // 日语
    oldData.forEach((ele) => {
      s.add(ele.jaContentInfo.typeClass);
    });

    newData = Array.from({ length: s.size }, () => []);

    oldData.forEach((ele) => {
      let index = [...s].indexOf(ele.jaContentInfo.typeClass);

      if (typeof ele.jaContentInfo.tag === "string") {
        ele.jaContentInfo.tag = ele.jaContentInfo.tag.split(",");
        ele.jaContentInfo.date = timeChange(ele.jaContentInfo.date);
      }

      let obj = {
        contentId: ele._id,
        ...ele.jaContentInfo,
      };

      newData[index].push(obj);
    });
  }

  return newData;
};

/**
 * @description: 获得置顶文章
 * @param {*}
 * @return {*}
 */
const getTopContent = async () => {
  try {
    state.loadingTopContent = false;

    const res = await proxy.$http.get(
      `${API}api/content/getTopContent?contentType=${state.contentType}&&topNum=3&&lang=${state.langFlag}`
    );

    let newArr = getFinCityList(res.data.list);

    // 深度展开数组
    state.contentTopList = [...newArr.flat()];

    state.loadingTopContent = true;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description: 更改空状态语言
 * @param {*}
 * @return {*}
 */
const changeEmpty = (nowLang) => {
  if (!nowLang) {
    state.descriptionText = "当前页面还没有发布的内容，敬请期待!";
  } else {
    state.descriptionText = "準備しております！お楽しみに！";
  }

  setResData();
};

// 获得锚点元素
let contentLineArr = document.getElementsByClassName("contentLine");
let contentPageItemArr = document.getElementsByClassName("contentPageItem");

// 监听语言变化
watch(
  () => state.langFlag,
  (nowLang) => {
    changeEmpty(nowLang);
  }
);

onMounted(() => {
  state.throttleFun = throttle(listenPageTop, 10);

  window.addEventListener("scroll", state.throttleFun, true);

  changeEmpty(state.langFlag);

  changeIndex(contentLineArr, 0, 150, -100, state.checkScrollFlag);
  changeIndex(contentPageItemArr, 1, 80, -100, state.checkScrollFlag);
  // 记得在请求后调用
  setArrLeagth();
});

onBeforeUnmount(() => {
  // 销毁滚动事件
  window.removeEventListener("scroll", state.throttleFun, true);
});
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";

// 页面
.content-page {
  // padding-top: 70px;
  min-height: 100vh;
  width: calc(100vw - 3px);
  background-color: #fff;

  // 显示区域
  .main-content-sec {
    position: relative;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    // width: calc(100vw - 3px);
    max-width: 800px;
    // width: 800px;
    margin: 0 auto;

    // 目录
    .main-content-index-list-box {
      position: absolute;
      top: 380px;
      right: -250px;
    }

    // 空状态
    .empty-box {
      width: calc(60vw);
      // width: 800px;
      height: calc(100vh - 519px);
      box-shadow: 0 0 5px #e5e9ef;
      border-radius: 30px;
      background-repeat: no-repeat;
      background-position: 75% 100%;
      background-image: url("../assets/img/statusImg/jingle.png");
    }

    // 标题
    .page-title {
      font-size: 30px;
      // font-family: 'Noto Serif SC','Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;;
      font-family: $font-f;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      font-weight: 100;

      &::after {
        content: "}";
        margin-left: 6px;
      }

      &::before {
        content: "{";
        margin-right: 6px;
      }

      &::after,
      &::before {
        color: $color-blog-yel;
        font-size: 1.5em;
        font-weight: 100;
        vertical-align: sub;
      }
    }

    // 顶部置顶文章
    .page-top-content-sec {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      width: 100%;
    }

    // 文章区域
    .page-content-main {
      min-height: 40vh;
      min-width: 800px;
      .page-content-sec {
        margin-bottom: 40px;
        width: 100%;
      }
    }
  }
}

// 空状态动画
.empty-enter-from,
.empty-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.empty-enter-to,
.empty-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.empty-enter-active,
.empty-leave-active {
  transition: opacity 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
}
</style>
