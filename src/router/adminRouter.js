/*
 * @Author: zxy
 * @Date: 2021-06-26 15:00:02
 * @LastEditTime: 2021-07-11 11:00:14
 * @FilePath: /my-blog/src/router/adminRouter.ts
 */
export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/adminPage/adminHome.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true
    },
    children: [
      {
        path: '/testPage',
        name: 'test',
        component: () => import('../views/adminPage/testPage.vue'),
        meta: {
          title: '文章增/修',
          requiresAuth: true
        }
      },
      {
        path: '/add',
        name: 'add',
        component: () => import('../components/adminPage/kanriPage/addPage.vue'),
        meta: {
          title: '文章增/修',
          requiresAuth: true
        }
      },
      {
        path: '/kanri',
        name: 'kanri',
        component: () => import('../components/adminPage/kanriPage/artKanriPage.vue'),
        meta: {
          title: '文章管理',
          requiresAuth: true
        }
      },
      {
        path: '/typeClass',
        name: 'typeClass',
        component: () => import('../components/adminPage/kanriPage/typeClassKanri.vue'),
        meta: {
          title: '类型管理',
          requiresAuth: true
        }
      },
      {
        path: '/appKanri',
        name: 'appKanri',
        component: () => import('../components/adminPage/kanriPage/appKanriPage.vue'),
        meta: {
          title: 'app管理',
          requiresAuth: true
        }
      },
      {
        path: '/homePageKanri',
        name: 'homePageKanri',
        component: () => import('../components/adminPage/kanriPage/homePageKanriPage.vue'),
        meta: {
          title: '首页图片管理',
          requiresAuth: true
        }
      },
      {
        path: '/UserKanri',
        name: 'UserKanri',
        component: () => import('../components/adminPage/kanriPage/userSetPage.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true
        }
      },
      {
        path: '/imgUpLoad',
        name: 'imgUpLoad',
        component: () => import('../components/adminPage/kanriPage/imgUpLoad.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true
        }
      }
    ]
  }
]
