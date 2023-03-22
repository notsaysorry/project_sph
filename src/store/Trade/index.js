import { reqUserAddress, reqTradeInfo } from "@/api"
const state = {
    userAddress: [],
    tradeInfo: {}
}
const mutations = {
    USER_ADDRESS(state, data) {
        state.userAddress = data
    },
    TRADE_INFO(state, data) {
        state.tradeInfo = data
    }

}
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqUserAddress();
        if (result.code == 200) {
            commit("USER_ADDRESS", result.data)
        }
    },
    async getTradeInfo({ commit }) {
        let result = await reqTradeInfo();
        if (result.code == 200) {
            commit("TRADE_INFO", result.data)
        }
    }

}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}