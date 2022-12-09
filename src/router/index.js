import Vue from "vue";
import VueRouter from "vue-router"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

Vue.use(VueRouter)


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, response, reject) {
    if (response && reject) {
        originPush.call(this, location, response, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, response, reject) {
    if (response && reject) {
        originReplace.call(this, location, response, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}




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

