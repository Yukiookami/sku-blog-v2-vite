/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-12-31 14:04:40
 * @FilePath: /sku-blog-vite/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import adminRouter from './adminRouter'
import homePageRouter from './homePageRouter'
import cssUIRouter from './cssUIRouter'
import billSystemRouter from './billSystemRouter';

let routes = []

routes = routes.concat(homePageRouter, adminRouter, cssUIRouter, billSystemRouter)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
