import request from './request'

export const getCategories = (data)=>{
    return request({
        url:'categories',
        data
    })
}
export const getGoods = (params)=>{
    return request({
        url:'goods',
        params
    })
}
export const deleteGoods = (id:number)=>{
    return request({
        url:`goods/${id}`,
        method:'delete'
    })
}
export const editGoods = (id,data)=>{
    return request({
        url:`goods/${id}`,
        method:'put',
        data
    })
}