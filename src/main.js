import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from '@/store'
import TypeNav from "@/components/TypeNav"
import CarouselImg from "@/components/CarouselImg"
import Pagination from "@/components/Pagination"
import { reqCatagoryList } from "@/api"
import * as API from "@/api"
import "@/mock/mockServe"
// 引入swiper样式
import "swiper/css/swiper.css"
import { MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload'
import lazyImg from "@/assets/images/1.gif"

Vue.use(VueLazyload, {
  loading: lazyImg,
})

Vue.config.productionTip = false

Vue.component(TypeNav.name, TypeNav)
Vue.component(CarouselImg.name, CarouselImg)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

reqCatagoryList();

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
