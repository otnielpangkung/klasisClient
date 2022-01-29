<template>
  <div class="InputTransaksi">
    <div class="title">INPUT TRANSAKSI</div>
    <div class="col">
      <div class="form container-fluid">
        <form @submit.prevent="inputTransaksi">
          <div class="form-row">
            <div class="col-sm">
              <label class="my-1 mr-2" for="Transaksi">Nama Transaksi</label>
              <div class="input-group">
                <input
                  v-model="namaTransaksi"
                  type="text"
                  id="User_ID"
                  class="form-control"
                  placeholder="Isi Nama Transaksi..."
                  required
                />
                <input
                  type="date"
                  v-model="tanggalTransaksi"
                  id="User_ID"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="col-sm">
              <label class="my-1 mr-2" for="Username">Jenis Transaksi</label>
              <div class="input-group">
                <select class="form-control" v-model="JenisTransaksiId" required>
                  <option selected disabled>Pilih Jenis Transaksi</option>
                  <option
                    v-for="jenis in this.jenisTransaksiList"
                    :key="jenis.id"
                    :value="jenis.id"
                  >{{jenis.namaJenis}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm">
              <label for="Harga" class="my-1 mr-2">Nominal</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="Rp">Rp</span>
                </div>
                <input type="number" v-model="jumlah" class="form-control" required />
              </div>
              <label class="my-1 mr-2" for="kelompokMA">Kelompok Mata Anggaran</label>
              <div class="input-group">
                <select class="form-control" v-model="KelompokMAId" required>
                  <option
                    v-for="kelompok in getKelMa()"
                    :key="kelompok.id"
                    :value="kelompok.id"
                  >{{kelompok.namaKelMa}}</option>
                </select>
              </div>
              <label class="my-1 mr-2" for="MataAnggaran">Mata Anggaran</label>
              <div class="input-group">
                <select class="form-control" v-model="MataAnggaranId" required>
                  <option
                    v-for="mataanggaran in getMa()"
                    :key="mataanggaran.id"
                    :value="mataanggaran.id"
                  >{{mataanggaran.namaMataAnggaran}}</option>
                </select>
              </div>
            </div>
            <div class="col-sm">
              <label class="my-1 mr-2" for="Keterangan">Keterangan:</label>
              <div class="input-group">
                <textarea class="form-control" v-model="keterangan" rows="7"></textarea>
              </div>
              <div class="d-flex justify-content-end my-2">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";

export default {
  name: "InputTransaksi",
  data() {
    return {
      namaTransaksi: "",
      keterangan: "",
      tanggalTransaksi: "",
      MataAnggaranId: 0,
      jumlah: 0,
      JenisTransaksiId: 0,
      KelompokMAId: 0
    };
  },
  computed: {
    jenisTransaksiList() {
      return this.$store.state.jenisTransaksi;
    },
    kelma() {
      return this.$store.state.kelMa;
    },
    mataanggaran() {
      return this.$store.state.mataAnggaran;
    }
  },
  created() {
    this.$store.dispatch("fetchJenisTransaksi");
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getMataAnggaran");
    localStorage.getItem("role");
    localStorage.getItem("namaJemaat");
  },
  methods: {
    inputTransaksi() {
      let payload = {
        namaTransaksi: this.namaTransaksi,
        keterangan: this.keterangan,
        tanggalTransaksi: this.tanggalTransaksi,
        MataAnggaranId: +this.MataAnggaranId,
        jumlah: +this.jumlah,
        JenisTransaksiId: +this.JenisTransaksiId,
        KelompokMAId: +this.KelompokMAId
      };

      return axios
        .post("/transaksi", payload, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          // localStorage.getItem("access_token");
          Swal.fire({
            title: "Berhasil",
            text: "Data Berhasil Ditambahkan",
            icon: "success",
            confirmButtonText: "Ok"
          });
          this.$router.push("/report/transaksi");
          // console.log(data);
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
          console.log(err);
        });
    },
    getKelMa() {
      let hasil = [];
      this.kelma?.map(item => {
        if (item.JenisTransaksiId == this.JenisTransaksiId) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getMa() {
      let hasil = [];
      this.mataanggaran?.map(item => {
        if (item.KelompokMAId == this.KelompokMAId) {
          hasil.push(item);
        }
      });
      return hasil;
    }
  }
};
</script>

<style scoped>
.InputTransaksi {
  width: 85vw;
}
* {
  text-align: left;
}
.title {
  font-weight: 700;
  padding: 0 15px;
  font-size: 40px;
  margin: 25px 0;
}
.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
}
.form {
  border-radius: 20px;
  background-color: rgb(237, 237, 237);
  padding: 2px 15px;
}
.form-row > .col,
.form-row > [class*="col-"] {
  padding-right: 5px;
  padding-left: 5px;
}
@media screen and (max-width: 800px) {
  .InputTransaksi {
    width: 100vw;
  }
  .title {
    font-weight: 500;
    padding: 0 0px;
    font-size: 20px;
    margin: 15px 0;
  }
  .form {
    border-radius: 20px;
    background-color: rgb(237, 237, 237);
    padding: 2px 5px;
  }
}
</style>