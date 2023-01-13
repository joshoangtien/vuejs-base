// Create axios instance
import axios from 'axios'
import store from '../store/index'

const service = axios.create({
    baseURL: process.env.VUE_APP_ENV_BASE_URL_API,
    timeout: 25000 // Request timeout
})
// Request intercepter
service.interceptors.request.use(
    (config) => {
        const token = 'token'
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // Set JWT token
        }
        return config
    },
    (error) => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response pre-processing
service.interceptors.response.use(
    (response) => {
        return response.data
    },
    async (error) => {
        // begin check refresh token
        const originalConfig = error.response

        // Refresh token
        if (originalConfig.data.code === 403) {
            const refreshToken = 'token'

            if (refreshToken) {
                try {
                    const response = await service.post('/auth/refresh-token', {
                        refreshToken: refreshToken
                    });

                    if (response.status) {
                        store.commit('auth/LOGIN_SUCCESS', response.data)
                        return service(originalConfig)
                    }
                } catch (e) {
                    store.commit('auth/LOG_OUT')
                    window.location.href = '/login'
                }
            }
        }

        // end check refresh token
        let message = error.message
        if (error.response?.data && error.response.data?.errors) {
            message = error.response.data.errors
        } else if (error.response?.data && error.response?.data.error) {
            message = error.response.data.error
        }

        console.log(message)

        return Promise.reject(error)
    }
)

export default service
