import { defineStore } from "pinia";
import { login as loginApi } from '@/api/login'
import type { User, Form } from '@/type/user'
import router from '@/router/index'
import {setTokenTime} from '@/utils/auth'

export default defineStore("app", {
    state() {
        return {
            token: localStorage.getItem('token'),
            siderType:true,
            lang: localStorage.getItem('lang') || 'zh'
        };
    },
    getters: {

    },
    actions: {
        login(userInfo: Form) {
            return new Promise<void>((resolve, reject) => {
                loginApi(userInfo).then((res) => {
                    localStorage.setItem('token', res.token);
                    this.token = localStorage.getItem('token');
                    setTokenTime();
                    router.replace('/');
                    resolve()
                }).catch(err => {
                    reject(err);
                })
            })
        },
        logout(){
            this.token = '';
            localStorage.clear()
            router.replace('/login')
        },
        changeSiderBar(){
            this.siderType = !this.siderType
        },
        changeLang(lang:string){
            this.lang = lang
        }
    },
})
