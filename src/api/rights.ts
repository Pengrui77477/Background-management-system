import request from './request';

export const getAllRights = () => {
    return request({
        url:`/rights/list`,
        
    })
}
export const getAllRoles = () => {
    return request({
        url:'/roles',
        method:'get',
    })
}
export const searchRoles = (data) => {
    return request({
        url:`roles/${data}`,
        method:'get',
        data
    })
}
export const addRoles = (data) => {
    return request({
        url:'/roles',
        method:'post',
        data
    })
}
export const deleteRoles = (data:number) => {
    return request({
        url:`roles/${data}`,
        method:'delete',
        data
    })
}