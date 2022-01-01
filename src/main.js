/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2022-01-01 19:25:35
 * @FilePath: /sku-blog-vite/src/main.js
 */
import {
  createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import {
  VueCookieNext
} from 'vue-cookie-next';
import API from './assets/js/API';
// elementUI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// css resets
import 'normalize.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// google事件优化
import 'default-passive-events';

// 引入dataV
// import dataV from '@jiaminghi/data-view';

// markdown编辑器
// import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
// import '@kangc/v-md-editor/lib/style/codemirror-editor.css';

// markdown编译器引入
// 轻量版
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// 主题
import Prism from 'prismjs';

// 引入todoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

// 引入流程图等图形
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

// 引入表情包
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
// markdown编译器引入end

// 预览组件
VMdPreview.use(vuepressTheme, {
  Prism,
});
// 编辑器
VMdEditor.use(vuepressTheme, {
  Prism,
});

// 编译器中间件
// VMdEditor.Codemirror = Codemirror;
VMdEditor.use(createTodoListPlugin());
VMdEditor.use(createMermaidPlugin());
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createLineNumbertPlugin())
VMdEditor.use(createHighlightLinesPlugin())
VMdEditor.use(createCopyCodePlugin())
VMdEditor.use(createAlignPlugin());

VMdPreview.use(createTodoListPlugin());
VMdPreview.use(createMermaidPlugin());
VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createHighlightLinesPlugin())
VMdPreview.use(createCopyCodePlugin())
VMdPreview.use(createAlignPlugin());
// 编译器中间件end

const app = createApp(App)
app.use(VueCookieNext)
app.use(VMdEditor);
app.use(VMdPreview)
app.use(ElementPlus)
// app.use(dataV)
// app.use(VueClipboard)
app.use(store).use(router).mount('#app')

app.config.globalProperties.$http = axios
app.config.globalProperties.$cookie = VueCookieNext
app.config.globalProperties.$API = API

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title

    // 判断是否需要登录
    if (to.meta.requiresAuth) {
      // 判断是否有cookie
      if (VueCookieNext.getCookie("login_SKU_cookies")) {
        next()
      } else {
        next({
          path: '/program'
        })
      }
    } else {
      next()
    }
  }

  //页面加载进度条
  NProgress.start();
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()

  // 每次进入页面滚动到顶部
  window.scrollTo(0, 0)
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})