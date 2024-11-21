import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.dark.less'
import App from './App.vue'
import router from './router'
import './permission' // permission control
import * as Icons from '@ant-design/icons-vue'
import 'virtual:svg-icons-register'
import Cookies from 'js-cookie';
import './assets/main.css'


const app = createApp(App)

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        domain: string;
    }
  }
app.config.globalProperties.domain = window.domain
Cookies.set('domain', window.domain, { domain: window.domain})
// 注册图标组件
for (const i in Icons) {
    app.component(i, Icons[i as keyof typeof Icons])
}


app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
