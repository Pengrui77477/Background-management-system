import request from './request'

export const getCategories = (data)=>{
    return request({
        url:'categories',
        data
    })
}