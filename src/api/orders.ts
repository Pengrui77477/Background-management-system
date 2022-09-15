import request from './request';

export const getOrders = (params)=>{
    return request ({
        url:'/orders',
        params
    })
}