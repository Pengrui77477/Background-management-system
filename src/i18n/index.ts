import { createI18n } from 'vue-i18n';
import EN from './en';
import ZH from './zh'
const message = {
    en: {
        ...EN
    },
    zh: {
        ...ZH
    }
}

const getCurrentLang = () => {
    const lang = localStorage.getItem('lang') || 'zh';
    const langCode = lang.indexOf('zh') === -1 ? 'en' : 'zh';
    localStorage.setItem('lang',langCode);
    return langCode;
}

const i18n = createI18n({
    legacy:false,
    globalInjection:true,
    locale: getCurrentLang() || 'zh',
    messages:message

})

export default i18n