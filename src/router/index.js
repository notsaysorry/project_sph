import Vue from "vue";
import VueRouter from "vue-router"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            name: "search",
            path: "/search",
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                showFooter: false
            }
        },
        {
            path: "/",
            redirect: "/home"
        }
    ]
})

