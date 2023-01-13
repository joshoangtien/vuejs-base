const state = {
    isCallingApi: null
}

const getters = {
    isCallingApi (state) {
        return state.isCallingApi
    }
}

const mutations = {
    SET_IS_CALLING_API (state, payload) {
        state.isCallingApi = payload
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
