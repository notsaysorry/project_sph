import Vue from "vue";
import VueRouter from "vue-router"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import Center from "@/pages/Center"

//引入二级路由组件
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"

import store from "@/store"


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




let router = new VueRouter({
    base: '/sph/',
    routes: [
        {
            name: "center",
            path: "/center",
            component: Center,
            meta: {
                showFooter: true
            },
            children: [
                {
                    path: "myorder",
                    component: MyOrder
                },
                {
                    path: "grouporder",
                    component: GroupOrder
                },
                {
                    path: "/center",
                    redirect: "/center/myorder"
                }
            ]
        },
        {
            name: "paysuccess",
            path: "/paysuccess",
            // 路由懒加载
            component: () => import("@/pages/PaySuccess"),
            meta: {
                showFooter: true
            }
        },
        {
            name: "pay",
            path: "/pay",
            component: Pay,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next();
                } else {
                    next(false)
                }
            }
        },
        {
            name: "trade",
            path: "/trade",
            component: Trade,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcar") {
                    next();
                } else {
                    next(false)
                }
            }
        },
        {
            name: "shopcar",
            path: "/shopcar",
            component: ShopCart,
            meta: {
                showFooter: true
            }
        },
        {
            name: "addcarsuccess",
            path: "/addcarsuccess",
            component: AddCartSuccess,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/home",
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            name: "search",
            path: "/search/:keyword?",
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
            name: "detail",
            path: "/detail/:goodId",
            component: Detail,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/",
            redirect: "/home"
        }
    ],
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        if (to.path == "/login") {
            next("/")
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("user/userInfo")
                    next()
                } catch (error) {
                    store.dispatch("user/userLogout")
                    next("/login")
                }
            }
        }
    } else {
        // 未登录不能去交易，支付，个人中心
        let toPath = to.path
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            next(`/login?redirect=${toPath}`)
        } else {
            next()
        }
    }
})

export default router;
