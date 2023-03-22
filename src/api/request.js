import axios from "axios"
import nprogress from "nprogress"
import store from "@/store"
import "nprogress/nprogress.css"


let requests = axios.create({
    baseURL: "/api",
    timeout: 5000
})

requests.interceptors.request.use((config) => {
    console.log(store)
    if (store.state.shopCar.uuid) {
        config.headers.userTempId = store.state.shopCar.uuid
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data
}, (error) => {
    return Promise.reject(new Error(error))
})


export default requests
