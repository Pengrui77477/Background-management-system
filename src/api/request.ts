import axios from "axios";
import { ElMessage } from 'element-plus';
import {diffTokenTime} from '@/utils/auth';
import useStore from '@/stores/index'
import NProgress from 'nprogress';

declare module 'axios' {
    interface AxiosInstance {
      (config: AxiosRequestConfig): Promise<any>
    }
  }

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(config =>{
    const {app} = useStore();
    NProgress.start();
    if(localStorage.getItem('token')){
        if(diffTokenTime()){
            app.logout()
            return Promise.reject(new Error('token 失效'))
        }
    }
    config.headers.Authorization  = localStorage.getItem('token');
    return config
},err => Promise.reject(new Error(err)))

 
//响应拦截器
service.interceptors.response.use(res => {
    // console.log(res);
    NProgress.done();
    const { data, meta } = res.data;
    if (meta.status === 200 || meta.status === 201) {
        return data
    } else {
        ElMessage.error(meta.msg);
        return Promise.reject(new Error(meta.msg))
    }
}, err => {
    err && ElMessage.error(err.message);
    return Promise.reject(err)
})

export default service