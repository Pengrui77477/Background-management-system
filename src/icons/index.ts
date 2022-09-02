import SvgIcon from '@/components/SvgIcon/index.vue';
import type { App } from 'vue';

export default {
    install(Vue: App) {
        Vue.component('svg-icon', SvgIcon)
    }
}