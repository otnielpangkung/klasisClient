<template>
  <div v-if="userLogin" class="sidebar">
    <header>
      <nav class="menu">
        <p>Menu</p>
        <ul>
          <li v-if="this.role == 'bendahara'">
            <router-link to="/">
              <i class="fas fa-home"></i> Beranda
            </router-link>
          </li>
          <li v-if="this.role == 'bendahara'">
            <router-link to="/input">
              <i class="fas fa-plus"></i> Tambah Transaksi
            </router-link>
          </li>
          <li v-if="this.role !== 'admin'">
            <router-link to="/report/transaksi">
              <i class="fas fa-list"></i> Seluruh Transaksi
            </router-link>
          </li>
          <li v-if="this.role !== 'admin'">
            <router-link to="/report/tahunan">
              <i class="fas fa-book-open"></i> Laporan Tahunan
            </router-link>
          </li>
          <li v-if="this.role !== 'admin'">
            <router-link to="/report/bulanan">
              <i class="fas fa-book-open"></i> Laporan Bulanan
            </router-link>
          </li>
          <li v-if="this.role !== 'admin'">
            <router-link to="/report/perminggu">
              <i class="fas fa-book-open"></i> Laporan Mingguan
            </router-link>
          </li>
          <li v-if="this.role !== 'admin'">
            <router-link to="/report/mataanggaran">
              <i class="fas fa-list"></i> Rincian Laporan
            </router-link>
          </li>
          <li v-if="this.role == 'bendahara'">
            <router-link to="/kelompokma">
              <i class="fas fa-list"></i> List Kel.M.Anggaran
            </router-link>
          </li>
          <li v-if="this.role == 'bendahara'">
            <router-link to="/mataanggaran">
              <i class="fas fa-list"></i> List Mata Anggaran
            </router-link>
          </li>
          <li v-if="this.role == 'bendahara'">
            <router-link to="/list/anggaran">
              <i class="far fa-money-bill-alt"></i> Anggaran
            </router-link>
          </li>
          <li v-if="this.role == 'admin'">
            <router-link to="/list/jemaat">
              <i class="fas fa-user-friends"></i> Database Anggota
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  // components: {
  //   RouterLink
  // },
  methods: {},
  computed: {
    role() {
      return localStorage.getItem("role");
    },
    userLogin() {
      return this.$store.state.isLogin;
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$store.commit("setUserLogin", true);
    }
    localStorage.getItem("role");
    localStorage.getItem("namaJemaat");
  }
};
</script>

<style scoped>
* {
  /* background-color: lavender; */

  box-sizing: border-box;
  user-select: none;
  margin: 0;
  padding: 0;
  color: #002366;
}
.sidebar {
  width: 12vw;
  margin-left: 3px;
  min-width: 150px;
  max-width: 155px;
}
p {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}
.menu {
  font-size: 14px;
}
nav ul {
  height: 100%;
  width: 100%;
  list-style: none;
}
nav ul li {
  line-height: 50px;
  /* border-bottom: 1px solid black; */
}
nav ul li a {
  display: block;
  width: 100%;
  text-decoration: none;
  font-weight: bolder;
}

nav ul li a:hover {
  color: whitesmoke;
  background: #002366;
  /* border-left: springgreen; */
}
nav ul ul {
  position: static;
}
nav ul ul li {
  line-height: 40px;
  border-bottom: none;
}
@media screen and (max-width: 800px) {
  .sidebar {
    display: none;
  }
}
</style>