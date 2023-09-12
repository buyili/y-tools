import * as VueRouter from 'vue-router'
import HomePage from "../views/HomePage.vue"
import Layout from "../views/layout/Index.vue"

const routes = [
  { path: '/', component: HomePage },
  { path: '/', component: Layout, children: [
    { path: '/ws', component: ()=> import('../views/ws/WebSocket.vue') },
    { path: '/tools', component: ()=>import('@/views/tools/ToolsPage.vue') },
    { path: '/tools/file-path', component: ()=>import('@/views/tools/filePath/FilePathPage.vue') },
    { path: '/tools/mybatis', component: ()=>import('@/views/tools/mybatis/MyBatisToolsPage.vue') },
    { path: '/tools/wx/jssdk', component: ()=>import('@/views/tools/wx/jssdk/WxJsSDKView.vue') },
    { path: '/notes', component: ()=>import('@/views/notes/index.vue') },
  ]}
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  // history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
