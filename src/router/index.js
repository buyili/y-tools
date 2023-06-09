import * as VueRouter from 'vue-router'
import HomePage from "../views/HomePage.vue"

const routes = [
  { path: '/', component: HomePage },
  { path: '/ws', component: ()=> import('../views/ws/WebSocket.vue') },
  { path: '/tools', component: ()=>import('/src/views/tools/ToolsPage.vue') },
  { path: '/tools/file-path', component: ()=>import('/src/views/tools/filePath/FilePathPage.vue') },
  { path: '/notes', component: ()=>import('/src/views/notes/index.vue') },
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  // history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
