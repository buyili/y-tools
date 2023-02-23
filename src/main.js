import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import directive from './directive' // directive
import components from './components'
import plugins from './plugins'

let app = createApp(App)

app.use(directive)
app.use(components)
app.use(plugins)

app.use(Antd).mount('#app')
