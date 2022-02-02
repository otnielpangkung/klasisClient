import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../API/axios"
import moment from "moment";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    amaCabang: "",
    jenisTransaksi: [],
    transaksiUser: [],
    kelMa: [],
    saldoUser: [],
    mataAnggaran: [],
    anggarans: [],
    isLogin: false,
    dataMasukan: {},
    dataKeluaran: {},
  },
  mutations: {
    setUserLogin(state, data) {
      state.isLogin = data
    },
    setjenisTransaksi(state, data) {
      state.jenisTransaksi = data
    },
    setKelMa(state, data) {
      state.kelMa = data
    },
    setTransaksiUser(state, data) {
      state.transaksiUser = data
    },
    setSaldoUser(state, data) {
      state.saldoUser = data
    },
    setMataANggaran(state, data) {
      state.mataAnggaran = data
    },
    setUserLogin(state, data) {
      state.isLogin = data
    },
    setAnggarans(state, data) {
      state.anggarans = data
    },
    setDataMasukan(state, data) {
      state.dataMasukan = data
    },
    setDataPengeluaran(state, data) {
      state.dataKeluaran = data
    },

  },
  actions: {
    fetchJenisTransaksi(context) {
      return axios.get("/database/jenistransaksi")
        .then(({ data }) => {
          context.commit("setjenisTransaksi", data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    fetchKelMa(context) {
      return axios
        .get(`/database/kelma`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          context.commit("setKelMa", data)
        })
        .catch(err => {
          console.log(err);
        });
    },

    getTransaksiUser(context) {
      return axios.get("/transaksi/jemaat", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.dispatch("getDataMasukan", data)
        context.dispatch("getDataPengeluaran", data)
        context.commit("setTransaksiUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getDataMasukan(context, data) {

      let value = [];
      let hasilTahun = [];
      data.rows?.map(item => {
        if (item.JenisTransaksiId == 1) {
          let tahun = moment(item.tanggalTransaksi).format("YYYY-MM");
          const index = hasilTahun.findIndex(a => a == tahun);
          if (index >= 0) {

            hasilTahun[index] = tahun;
            value[index] += Number(item.jumlah)
          } else {

            hasilTahun.push(tahun);
            value.push(Number(item.jumlah));
          }
        }
      });
      const payload = {
        value: value,
        hasilTahun: hasilTahun
      }
      context.commit("setDataMasukan", payload)
    },
    getDataPengeluaran(context, data) {

      let value = [];
      let hasilTahun = [];
      data.rows?.map(item => {
        if (item.JenisTransaksiId == 2) {
          let tahun = moment(item.tanggalTransaksi).format("YYYY-MM");
          const index = hasilTahun.findIndex(a => a == tahun);
          if (index >= 0) {

            hasilTahun[index] = tahun;
            value[index] += Number(item.jumlah)
          } else {

            hasilTahun.push(tahun);
            value.push(Number(item.jumlah));
          }
        }
      });
      const payload = {
        value: value,
        hasilTahun: hasilTahun
      }
      // console.log(payload);
      context.commit("setDataPengeluaran", payload)
    },
    getSaldo(context) {
      return axios.get("/database/saldo", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "===========");
        context.commit("setSaldoUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getMataAnggaran(context) {
      return axios.get("/database/mataanggaran", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "===========");
        context.commit("setMataANggaran", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAnggaran(context) {
      return axios.get("/transaksi/anggaran", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.commit("setAnggarans", data)
      }).catch(err => {
        console.log(err);
      })
    },

  },
  modules: {
  }
})
