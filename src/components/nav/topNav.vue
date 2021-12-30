<!--
 * @Author: your name
 * @Date: 2021-04-20 21:06:28
 * @LastEditTime: 2021-12-30 15:03:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sku-blog-vite/src/components/nav/topNav.vue
-->
<template>
  <nav @mouseenter="changeMove"
  @mouseleave="changeMove" class="top-nav-sec">
    <!-- logo -->
    <top-logo :moveYou="moveYou"></top-logo>

    <!-- nav部分 -->
    <div class="top-nav-main" v-cloak>
      <router-link v-for="(item, index) in meunList" :key="`navList${index}`"
      :to="item.router"
      class="top-nav-span">
        <i :class="item.icon"></i>
        <span v-if="!lang">{{item.title}}</span>
        <span v-else>{{item.jpTitle}}</span>
      </router-link>
    </div>

    <div class="top-nav-user-sec">
      <!-- 搜索 -->
      <i @click="showSearch(0)" class="el-icon-search search-bottoun"></i>
      <!-- 管理员登录 -->
      <div @click="showSearch(1)" class="top-nav-user-box">
        <i class="el-icon-user"></i>
        <img class="user-icon-show-box" :src="iconUrl" alt="" v-if="iconUrl">
      </div>

      <!-- 登出 -->
      <div v-if="iconUrl" @click="nowGetOut()" class="login-out-box">
        <img src="../../assets/img/fontIcon/loginOut.svg" alt="">
      </div>
    </div>

    <!-- 展开面板 -->
    <div class="search-from-main" v-cloak
    style="opacity: 0;"
    :class="{'search-from-main-show': isShowSearch}">
      <img @click="showSearch()" class="close" src="../../assets/img/fontIcon/close.svg" alt="">
      <!-- 搜索部分 -->
      <div v-if="!showWitch">
        <div class="search-from">
          <h3 class="search-title">{{searchText}}</h3>
          <!-- 搜索 -->
          <i class="el-icon-search search-bottoun"></i>
          <input @keyup.enter="go" class="search-input" v-model="keyword" placeholder="Search">
        </div>
      </div>

      <!-- 登录部分 -->
      <div class="search-from" v-else v-cloak>
        <form>
          <input @keyup.enter="login" class="search-input login-input"
          @focus="clearError"
          :class="{'login-error': loginError}" v-model="username" placeholder="username">
          <input @keyup.enter="login" type="password" class="search-input"
          @focus="clearError"
          :class="{'login-error': loginError}" v-model="password" placeholder="password">
        </form>
      </div>
      <img class="kanban" src="../../assets/img/search/kawai.gif" @click="creatSuperUser()" alt="">
    </div>
  </nav>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import topLogo from '../topLogo/topLogo.vue'
import store from '../../store'
import { goToPage, loginOut, getIcon } from '../../assets/js/common'
// 页面闪烁罪魁祸首 live2D
// 老婆
// import { setYome } from '../../assets/js/yome'


export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 语言
      lang: computed(() => store.state.langFlag),
      // 目录列表
      meunList: computed(() => store.state.meunList),
      // 控制小狐狸移动
      moveYou: false,
      /**
       * 改变移动值
       * @event
       */
      changeMove: () => {
        state.moveYou = !state.moveYou
      },
      // 搜索框文本
      searchText: '想要找点什么呢 ？',
      // 是否显示展开面板
      isShowSearch: false,
      // 显示搜索框还是显示登录
      showWitch: 0,
      /**
       * 显示展开界面，点击触发
       * @event
       *
       * @param {number} flag
       */
      showSearch: (flag = 0) => {
        if (flag && proxy.$cookie.getCookie("login_SKU_cookies")) {
          goToPage('add')
        } else {
          state.isShowSearch = !state.isShowSearch
          state.showWitch = flag
        }
      },
      // 输入框keyword
      keyword: '',
      // 用户名
      username: '',
      // 密码
      password: '',
      // 是否登录错误
      loginError: false,
      /**
       * 跳转到搜索结果页面
       * @event
       */
      go: () => {
        if (state.keyword) {
          goToPage('search', state.keyword)
          state.showSearch()
          state.keyword = ''
        }
      },
      /**
       * 登录跳转到管理员页面
       * @event
       */
      login: () => {
        if (state.username && state.password) {
          proxy.$http.post(`${API}api/users/login`, {
            name: state.username,
            password: state.password
          }).then((res) => {
            if(!res.data.status) {
              state.loginError = true
            } else {
              let { token } = res.data
              // const decoded = jwt_decode(token)
              proxy.$cookie.setCookie("login_SKU_cookies", token, 60 * 60 * 24 * 7)

              goToPage('home')
            }
          })
          // ctx.$cookie.setCookie("login_SKU_cookies", state.username, 60 * 60 * 24 * 30)

          // goToPage('add')
        } else {
          state.loginError = true
        }

        state.username = ''
        state.password = ''
      },
      /**
       * 清除登录错误，重新聚焦时触发
       * @event
       */
      clearError: () => {
        state.loginError = false
      },
      /**
       * @description: 创建超级用户（给自己留的后门）
       * @param {*}
       * @return {*}
       */
      creatSuperUser: () => {
        proxy.$http.post(`${API}api/users/register`, {
          name: 'zouxinyu',
          email: '1073898183@qq.com',
          password: '510704199903200017',
          power: 0
        })
      },
      // 头像url
      iconUrl: '',
      /**
       * @description: 登出
       * @param {*}
       * @return {*}
       */
      nowGetOut: () => {
        loginOut('login_SKU_cookies')
        state.iconUrl = getIcon()
      }
    })

    onMounted(() => {
      state.iconUrl = getIcon()
      // setYome
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    topLogo
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

// 防止页面闪烁
[v-cloak] {
  display: none !important;
}

.top-nav-sec {
  position: fixed;
  display: flex;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 60px;
  width: calc(100vw - 80px);
  user-select: none;
  z-index: 2147483647;
  background-image: linear-gradient(#fff, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0));
  // box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  transition: all .5s ease-in-out;

  .top-nav-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    transition: all .5s ease-in-out;
    transform: translateX(100px);

    .top-nav-span {
      position: relative;
      padding: 0 20px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      text-decoration: none;
      color: #666;

      i {
        margin-right: 5px;
      }

      &::before {
        content: "";
        position: absolute;
        opacity: 1;
        bottom: -21px;
        left: 13%;
        display: block;
        height: 6px;
        width: 0;
        background-color: #fe8b00;
        transition: all .3s ease-in-out;
      }

      &:hover {
        color: #fe8b00;

        &::before {
          width: 80%;
        }
      }
    }
  }

  // 用户区域
  .top-nav-user-sec {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgba(0, 0, 0, .5);
    width: 100px;
    font-size: 25px;

    .search-bottoun {
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        color: $color-blog-yel;
      }
    }

    .top-nav-user-box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, .5);
      cursor: pointer;

      .user-icon-show-box {
        position: absolute;
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .login-out-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      cursor: pointer;

      img {
        width: 100%;
      }
    }
  }

  &:hover {
    // background-image: linear-gradient(#fff, rgba(255, 255, 255, .8), rgba(255, 255, 255, .5));
    background-color: rgba(255, 255, 255, .8);
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);

    .top-nav-main {
      opacity: 1;
      transform: translateX(0);
    }
  }

  // 搜索
  .search-from-main {
    overflow: hidden;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
    background-color: rgba(255, 255, 255, .99);
    transition: all .25s ease;
    z-index: 99999;

    .close {
      position: absolute;
      top: 30px;
      right: 40px;
      width: 30px;
      cursor: pointer;
      z-index: 99999;
    }

    .search-from  {
      font-family: $font-f;
      position: relative;
      padding-bottom: 200px;
      width: 600px;
      color: #666;

      // 搜索标题
      .search-title {
        font-weight: normal;
        padding-left: 24px;
        font-size: 16px;
      }

      // 搜索按钮
      .search-bottoun {
        font-size: 35px;
        position: absolute;
        left: 15px;
        bottom: 210px;
        color: rgba(0, 0, 0, .2);
      }

      // 搜索框
      .search-input {
        font-size: 24px;
        background: #fff;
        padding: 12px 24px 12px 64px;
        width: 100%;
        outline: none;
        border-radius: 50px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 2px solid #ccc;

        &::placeholder {
          color: rgb(196, 194, 194);
          font-weight: normal;
        }
      }

      // 登录框
      .login-input {
        margin: 0 0 20px;
      }

      .login-error {
        box-shadow: 0 0 6px rgb(227 23 13 / .4);
        animation: loginError .3s linear;
      }

      @keyframes loginError {
        from {
          transform: translateX(0);
        }

        25% {
          transform: translateX(10px);
        }

        50% {
          transform: translateX(-10px);
        }

        75% {
          transform: translateX(10px);
        }

        to {
          transform: translateX(0px);
        }
      }
    }

    // 看板娘
    .kanban {
      position: absolute;
      right: 40px;
      bottom: 40px;
    }
  }

  // 显示搜索框
  .search-from-main-show {
    visibility: visible;
    opacity: 1 !important; 
    animation: showSearch .5s linear;
    transform-origin: center;
  }

  @keyframes showSearch {
    from {
      top: 50%;
      left: 50%;
      bottom: 50%;
      right: 50%;
      width: 0;
      height: 0;
    }

    54% {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
    }

    55% {
      transform: scale(1);
    }

    70% {
      transform: scale(.9);
    }

    85% {
      transform: scale(1);
    }

    95% {
      transform: scale(.95);
    }

    to {
      transform: scale(1);
    }
  }
}
</style>
