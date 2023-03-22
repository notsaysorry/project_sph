import { reqPhoneCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"
import { getToken, setToken, removeToken } from "@/util/token"
// 登录与注册的仓库
const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    PHONE_CODE(state, code) {
        state.code = code
    },
    TOKEN(state, data) {
        state.token = data
    },
    USER_INFO(state, data) {
        state.userInfo = data;
    },
    CLEAR_TOKEN(state) {
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    async getPhoneCode({ commit }, phone) {
        let result = await reqPhoneCode(phone)
        if (result.code == 200) {
            commit("PHONE_CODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit("TOKEN", result.data.token)
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("USER_INFO", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    async userLogout({ commit }) {
        let result = await reqUserLogout()
        if (result.code == 200) {
            commit("CLEAR_TOKEN")
            return "ok"
        } else {
            Promise.reject(new Error("fail"))
        }
    }


}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}