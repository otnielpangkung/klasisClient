<template>
  <nav v-if="this.userLogin" class="navbar navbar-expand-lg">
    <!-- <img src="../assets/opLogo.png" alt /> -->
    <router-link to="/">
      <a class="navbar-brand">Gereja Toraja - Klasis Makassar</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul id="kanan" class="navbar-nav mr-auto">
        <li class="nav-item dropdown" v-if="this.role !== 'admin'">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Report</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/report/transaksi">Transaksi</a>
            <a class="dropdown-item" href="/report/bulanan">Bulanan</a>
            <a class="dropdown-item" href="/report/perminggu">Per Minggu</a>
            <a class="dropdown-item" href="/report/mataanggaran">Rincian Mata Anggaran</a>
            <a class="dropdown-item" href="/list/anggaran">Daftar Anggaran</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Input</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" v-if="this.role == 'bendahara'" href="/input">Transaksi</a>
            <a class="dropdown-item" href="/kelompokma">Kelompok</a>
            <a class="dropdown-item" href="/mataanggaran">Mata ANggaran</a>
          </div>
        </li>
        <li class="nav-item dropdown" v-if="this.role == 'admin'">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Daftar</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/list/jemaat">Jemaat</a>
            <a class="dropdown-item" href="/list/anggota">Anggota</a>
          </div>
        </li>
      </ul>
      <div class="nav-inline">
        <li type="none" id="user" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-tie"></i>
            {{namaJemaat}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="itemNav" href="/changepass">Ubah Password</a>
            <a class="dropdown-item" id="itemNav" @click.prevent="logout()">Logout</a>
          </div>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    namaJemaat() {
      return localStorage.getItem("namaJemaat");
    },
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
  },
  methods: {
    logout() {
      this.$router.push("/login");
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      localStorage.removeItem("namaJemaat");
      this.$store.commit("setUserLogin", false);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  #navbarDropdown {
    display: none;
  }
  #user {
    justify-self: right;
  }
}
.navbar-brand {
  font-size: 25px;
}

img {
  width: 100px;
  margin-right: 10px;
}
* {
  background-color: #002366;
}
.navbar {
  color: #ffffff;
  min-height: 100px;
}
.navbar a {
  color: #f3f2f2;
}
.navbar a:hover {
  /* background-color: #ffffff; */
  color: #093bff;
}
#itemNav {
  color: #002366;
}
.navbar .nav-item:hover .dropdown-menu {
  display: block;
}

@media screen and(max-width: 800px) {
  nav {
    min-height: 200px;
  }
}
</style>