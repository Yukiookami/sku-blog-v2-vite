/*
 * @Author: zxy
 * @Date: 2021-12-31 14:02:20
 * @LastEditTime: 2021-12-31 14:09:42
 * @FilePath: /sku-blog-vite/src/router/billSystemRouter.js
 */
export default [
  {
    path: '/bill',
    name: 'bill',
    component: () => import('../views/billSystem/billSystem.vue'),
    meta: {
      title: '账单系统',
      requiresBillAuth: true
    }
  }
]