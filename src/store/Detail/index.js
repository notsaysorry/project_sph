import { reqGoodDetail, reqAddOrUpdateShopCar } from '@/api'

const state = {
    goodDetail: {}
}
const mutations = {
    GOOD_DETAIL(state, detail) {
        state.goodDetail = detail
    }
}
const actions = {

    async categoryList({ commit }, skuId) {
        console.log(skuId)
        let result = await reqGoodDetail(skuId);
        if (result.code == 200) {
            commit("GOOD_DETAIL", result.data)
        }
    },
    async addOrUpdateShopCar({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCar(skuId, skuNum);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodDetail.categoryView || {}
    },
    skuInfo(state) {
        return state.goodDetail.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodDetail.spuSaleAttrList || []
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}