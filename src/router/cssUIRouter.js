/*
 * @Author: zxy
 * @Date: 2021-08-17 13:10:38
 * @LastEditTime: 2021-08-17 13:21:48
 * @FilePath: /my-blog/src/router/cssUIRouter.ts
 */
export default [
  {
    path: '/cssUI',
    name: 'cssUI',
    component: () => import('../views/cssUI/cssUIPage.vue'),
    meta: {
      title: 'css UI'
    },
    children: [
      {
        path: '/cssButton',
        name: 'cssButton',
        component: () => import('../components/cssUIPage/comUI/cssButton.vue'),
        meta: {
          title: 'css按钮'
        }
      }
    ]
  }
]