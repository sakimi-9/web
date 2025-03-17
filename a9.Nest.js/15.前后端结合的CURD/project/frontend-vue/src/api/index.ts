import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 可以在这里添加token等认证信息
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 添加用户
export const addUser = (data: any) => instance.post('/user', data)

// 获取用户列表
export const getList = (params: any) => instance.get('/user', { params })

// 删除用户
export const delUser = (data: { id: number }) => instance.delete(`/user/${data.id}`)

// 更新用户
export const updateUser = (data: any) => instance.patch(`/user/${data.id}`, data)

// 添加tag
export const addTags = (data: any) => instance.post('/user/tags', data)