/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-11-26 19:19:59
 * @FilePath: /sku-blog-vite/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import adminRouter from './adminRouter'
import homePageRouter from './homePageRouter'
import cssUIRouter from './cssUIRouter'

// let adminRouter = require('./adminRouter')
// let homePageRouter = require('./homePageRouter')
// let cssUIRouter = require('./cssUIRouter')

let routes = []

routes = routes.concat(homePageRouter, adminRouter, cssUIRouter)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
