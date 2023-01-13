import service from '../plugins/axios'
import store from '../store/index'

export default {
    async request (method, url, params, data, headers = {}, config = {}) {
        try {
            store.commit('common/SET_IS_CALLING_API', true)
            const result = await service.request({...config, url, params, data, method: method.toLowerCase(), headers})
            store.commit('common/SET_IS_CALLING_API', false)
            return result
        } catch (e) {
            store.commit('common/SET_IS_CALLING_API', false)
            throw e
        }
    },

    get (url, params, config = {}) {
        return this.request('get', url, params, {}, {}, config)
    },

    post (url, data, headers = {}, config = {}) {
        return this.request('post', url, {}, data, headers, config)
    },

    put (url, data, config = {}) {
        return this.request('put', url, {}, data, {}, config)
    },

    patch (url, data, config = {}) {
        return this.request('patch', url, {}, data, {}, config)
    },

    delete (url, data = {}, config = {}) {
        return this.request('delete', url, {}, data, {}, config)
    }
}
