import { RepositoryFactory } from "../../api/RepositoryFactory";
const ProductsRepository = RepositoryFactory.get('products')

const state = {
    products: []
}

const getters = {
    products (state) {
        return state.products
    }
}

const mutations = {
    SET_PRODUCTS (state, payload) {
        state.products = payload
    }
}

const actions = {
    async getProducts({commit}) {
        const result = await ProductsRepository.getList()
        commit('SET_PRODUCTS', result.products)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
