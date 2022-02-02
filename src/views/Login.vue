<template>
  <div class="LoginPage" data-aos="zoom-in" data-aos-duration="1500">
    \
    <img src="../assets/LogoGerejaToraja.png" alt />
    <!-- <p>SISTEM INFORMASI KEUANGAN</p> -->
    <p>Sistem Informasi Keuangan Gereja Toraja</p>
    <form @submit.prevent="login">
      <input class="form-control" type="text" v-model="username" placeholder="username" />
      <input class="form-control" type="password" v-model="password" placeholder="password" />
      <button style="submit" class="btn btn-primary">Login</button>
      <p id="copyright">Copyright © 2021 - otnielpangkung</p>
      <img src="../assets/opLogo.png" id="opLogo" alt />
    </form>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      return axios
        .post("/user/login", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data.Jemaat);
          //   this.$store.commit("setUserLogin", true);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("namaJemaat", data.Jemaat);
          localStorage.setItem("username", data.username);
          localStorage.setItem("role", data.role);
          this.$store.commit("setUserLogin", true);
          this.$router.push("/");
          Swal.fire("Syalom", "Selamat Datang dan Selamat melayani", "success");
          localStorage.getItem("role");
          localStorage.getItem("namaJemaat");
        })
        .catch(err => {
          Swal.fire("Maaf", "username / password salah", "error");
        });
    }
  }
};
</script>

<style scoped>
#opLogo {
  width: 60px;
  justify-self: center;
}
p {
  font-size: 30px;
}
#copyright {
  margin-top: 5px;
  font-size: 12px;
  justify-self: center;
}
.LoginPage {
  min-width: 100vw;
  display: grid;
  align-content: center;
  justify-content: center;
  min-height: 100vh;
  justify-content: center;
  justify-items: center;
  /* align-items: center; */
  /* background-color: aqua; */
}
.LoginPage img {
  max-width: 200px;
}
.LoginPage form {
  display: grid;
  margin-top: 10px;
}

form input {
  /* background-color: #f2f2f2; */
  margin-top: 5px;
  border: none;
  text-align: center;
}

form input {
  font-size: 18px;
  color: rgb(10, 0, 0);
}

form button {
  margin-top: 20px;
  font-size: 18px;
}

@media screen and (max-width: 800px) {
  .LoginPage img {
    max-width: 120px;
  }
  .LoginPage form {
    display: grid;
    margin-top: 10px;
  }
  form button {
    margin-top: 10px;
    font-size: 12px;
  }
  form input {
    font-size: 14px;
    color: rgb(10, 0, 0);
  }
}
</style>