import { watch } from 'vue';
import useStore from '@/stores/index'
const { app } = useStore();

export const watchLang = (...cbs) => {
    watch(() => app.lang, () => {
        cbs.forEach(cb => cb(app.lang))
    }, { deep: true })
}