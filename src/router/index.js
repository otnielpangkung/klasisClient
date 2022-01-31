import Vue from 'vue'
import VueRouter from 'vue-router'
import Swal from "sweetalert2";
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import InputTransaksi from "../views/InputTransaksi.vue"

import AllTransaksi from "../views/AllTransaksi.vue"
import ReportBulanan from "../views/LaporanBulanan.vue"
import ReportTahunan from "../views/LaporanTahunan.vue"
import RincianMa from "../views/RincianMa.vue"
import DaftarMa from "../views/DaftarMa.vue"
import DaftarKelMa from "../views/DaftarKelMa"
import JemaatList from "../views/JemaatList.vue"
import AnggaranPage from "../views/AnggaranPage.vue"

import LaporanPerMinggu from "../views/LaporanPerMinggu.vue"
import UbahPass from "../views/UbahPass.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/input',
    name: 'InputTransaksi',
    component: InputTransaksi,
    meta: { requiresAuth: true }
  },
  {
    path: '/mataanggaran',
    name: 'DaftarMa',
    component: DaftarMa,
    meta: { requiresAuth: true }
  },
  {
    path: '/kelompokma',
    name: 'DaftarKelMa',
    component: DaftarKelMa,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/transaksi',
    name: 'AllTransaksi',
    component: AllTransaksi,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/bulanan',
    name: 'ReportBulanan',
    component: ReportBulanan,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/tahunan',
    name: 'ReportTahunan',
    component: ReportTahunan,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/mataanggaran',
    name: 'RincianMa',
    component: RincianMa,
    meta: { requiresAuth: true }
  },
  {
    path: '/list/jemaat',
    name: 'JemaatList',
    component: JemaatList,
    meta: { requiresAuth: true }
  },
  {
    path: '/list/anggaran',
    name: 'AnggaranPage',
    component: AnggaranPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/report/perminggu',
    name: 'LaporanPerMinggu',
    component: LaporanPerMinggu,
    meta: { requiresAuth: true }
  },
  {
    path: '/changepass',
    name: 'UbahPass',
    component: UbahPass,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { // pengecekan meta required
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      Swal.fire("Maaf", "Anda Harus Login Terlebih dahulu", "error");
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
