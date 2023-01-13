import Repository from '../Repository'

const resource = '/products'

export default {
    async getList (data) {
        try {
            return await Repository.get(`${resource}`, data)
        } catch (e) {
            return this.setErrors(e)
        }
    },
    setErrors (e) {
        const errorCode = e.response ? e.response.status : 500
        return {
            status: false,
            errorCode: errorCode,
            data: e.response ? e.response.data : 'error',
            error: e
        }
    }
}
