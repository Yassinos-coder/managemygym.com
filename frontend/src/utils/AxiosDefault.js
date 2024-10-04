import axios from 'axios'

const AxiosDefault = axios.create({
    baseURL: 'http://localhost:8009/api/v1/',
})

AxiosDefault.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') ? localStorage.token : ''
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default AxiosDefault