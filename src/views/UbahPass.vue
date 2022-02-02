<template>
  <div class="UbahPass">
    <p class="title">UBAH PASSWORD</p>

    <form @submit.prevent="confirmChange()">
      <div class="row justify-content-center">
        <p id="pass">Password Baru:</p>

        <div class="col col-lg-3">
          <input
            class="form-control"
            type="password"
            v-model="password"
            minlength="5"
            placeholder="Min. 5 karakter"
            required
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-primary" type="submit">Ubah Password</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";
export default {
  name: "UbahPass",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    confirmChange() {
      Swal.fire({
        title: "Yakin?",
        text: "Apakah Yakin merubah password",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ubah..",
        cancelButtonText: "Tidak!!"
      }).then(result => {
        if (result.isConfirmed) {
          this.changePass();
          Swal.fire("Berhasil!", "Password Anda Berhasil Diubah", "success");
          this.$store.dispatch("getTransaksiUser");
          this.password = "";
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    },
    changePass() {
      return axios.put(
        "/user/password",
        {
          password: this.password
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.UbahPass {
  width: 85vw;
  /* background-color: aqua; */
}
.title {
  font-weight: 700;
  padding: 0 15px;
  font-size: 40px;
  margin: 25px 0;
}
#pass {
  font-size: 30px;
  font-weight: 600;
}
</style>