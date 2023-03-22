import { getUuid } from "@/util/uuid_token"
import { reqCarList, reqDeleteCarById, reqCheckCar } from "@/api"

const state = {
    uuid: getUuid(),
    cartList: []
}
const mutations = {
    CAR_LIST(state, data) {
        state.cartList = data
    }
}
const actions = {
    async getCarList({ commit }) {
        let result = await reqCarList();
        if (result.code == 200) {
            commit("CAR_LIST", result.data)
        }
    },
    async deleteCarById({ commit }, skuId) {
        let result = await reqDeleteCarById(skuId);
        if (result.code == 200) {
            return "ok"
        } else {
            Promise.reject(new Error("fail"))
        }
    },
    async checkCar({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCar(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    deleteAllCheck({ dispatch, getters }) {
        let cartInfoList = getters.cartInfo.cartInfoList || [];
        let pAll = []
        cartInfoList.forEach(item => {
            if (item.isChecked == "1") {
                let p = dispatch("deleteCarById", item.skuId)
                pAll.push(p)
            }
        });
        return Promise.all(pAll)
    },
    updateAllCheck({ dispatch, getters }, isChecked) {
        console.log(getters)
        let cartInfoList = getters.cartInfo.cartInfoList || []
        let pAll = []
        cartInfoList.forEach(item => {
            let p = dispatch("checkCar", { skuId: item.skuId, isChecked })
            pAll.push(p)
        })
        return Promise.all(pAll)
    }

}
const getters = {
    cartInfo(state) {
        return state.cartList[0] || {}
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}