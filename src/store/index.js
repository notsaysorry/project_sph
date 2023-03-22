import Vue from "vue";
import Vuex from "vuex"
import home from "./Home"
import register from "./Register"
import search from "./Search"
import detail from "./Detail"
import shopCar from "./ShopCar"
import user from "./User"
import trade from "./Trade"

Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        home,
        register,
        search,
        detail,
        shopCar,
        user,
        trade
    }
})