<template>
  <nav v-if="userLogin" class="navbar">
    <a class="navbar-brand">GT - KLASIS MAKASSAR</a>
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
      <ul>
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
          <a class="dropdown-item" href="/report/mataanggaran">Rincian Mata Anggaran</a>
        </div>

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
            <a class="dropdown-item" href="/input">Transaksi</a>
            <a class="dropdown-item" href="/kelompokma">Kelompok</a>
            <a class="dropdown-item" href="/mataanggaran">Mata ANggaran</a>
          </div>
        </li>
      </ul>
      <div class="nav-inline">
        <li type="none" id="user" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-tie"></i>
            {{namaJemaat}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" @click.prevent="logout()">Logout</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
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
      localStorage.removeItem("access_token");
      this.$router.push("/login");
      this.$store.commit("setUserLogin", false);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  /* #kanan {
    background-color: aqua;
    display: none;
  } */
  #user {
    justify-self: right;
  }
}
.navbar-brand {
  font-size: 22px;
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
.navbar a :hover {
  background-color: #ffffff;
  color: #002366;
}
@media screen and(max-width: 800px) {
  nav {
    min-height: 200px;
  }
}
</style>