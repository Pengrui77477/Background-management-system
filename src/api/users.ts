import request from './request';

export const getUser = (params)=>{
    return request({
        url:'/users',
        params
    })
}
export const changeUserState = (uid:string, type:string)=>{
    return request({
        url:`users/${uid}/state/${type}`,
        method:'put'
    })
}
export const addUser = (data)=>{
    return request({
        url:`users`,
        method:'post',
        data
    })
}
export const editUser = (data)=>{
    return request({
        url:`users/${data.id}`,
        method:'put',
        data
    })
}
export const deleteUser = (data:number)=>{
    return request({
        url:`users/${data}`,
        method:'delete',
        data
    })
}