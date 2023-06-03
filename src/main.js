import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from "./router/index.js"


import directive from './directive' // directive
import components from './components'
import plugins from './plugins'

let app = createApp(App)

app.use(router)
app.use(directive)
app.use(components)
app.use(plugins)

app.use(Antd).mount('#app')
