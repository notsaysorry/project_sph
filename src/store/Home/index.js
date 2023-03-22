import { reqCatagoryList, reqBanners, reqFloors } from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    CATEGORY_LIST(state, value) {
        state.categoryList = value
    },
    BANNER_LIST(state, value) {
        state.bannerList = value
    },
    FLOOR_LIST(state, value) {
        state.floorList = value
    }
}
const actions = {

    async categoryList({ commit }) {
        let result = await reqCatagoryList();
        if (result.code == 200) {
            commit("CATEGORY_LIST", result.data)
        }
    },
    async getBanners({ commit }) {
        let result = await reqBanners();
        if (result.code == 200) {
            commit("BANNER_LIST", result.data)
        }
    },
    async getFloors({ commit }) {
        let result = await reqFloors();
        if (result.code == 200) {
            commit("FLOOR_LIST", result.data)
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