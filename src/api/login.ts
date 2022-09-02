import request from './request';
import type {Form} from '@/type/user'
export const login = (data: Form)=>{
    return request({
        url:'/login',
        method:'POST',
        data
    })
}