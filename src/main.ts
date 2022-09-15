import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//全局路由守卫
import '@/router/permission'

import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/dark/css-vars.css'

import 'virtual:svg-icons-register'
// import SvgIcon from '@/icons/index'
import SvgIcon from '@/components/SvgIcon/index.vue';
import * as ElIcons from '@element-plus/icons-vue'
import i18n from './i18n'



const app = createApp(App)
for (let item in ElIcons) {
    app.component(item, ElIcons[item])
}
app
    .component('svg-icon', SvgIcon)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app')
