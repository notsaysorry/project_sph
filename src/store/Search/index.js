import { reqGoodList } from '@/api'

const state = {
    goodList: {}
}
const mutations = {
    GET_GOOD_LIST(state, value) {
        state.goodList = value
    }
}
const actions = {
    async getGoodList({ commit }, params = {}) {
        let result = await reqGoodList(params)
        if (result.code == 200) {
            commit("GET_GOOD_LIST", result.data)
        }
    }
}
const getters = {
    attrsList(state) {
        return state.goodList.attrsList || []
    },
    goodsList(state) {
        return state.goodList.goodsList || []
    },
    trademarkList(state) {
        return state.goodList.trademarkList || []
    },
    total(state) {
        return state.goodList.total || 0
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}