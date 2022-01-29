<template>
  <div class="RincianMa">
    <h2 class="mt-4 mb-2">Rincian Anggaran</h2>
    <div class="input-group mb-3 justify-content-center">
      <div class="col col-lg-2">
        <label class="my-1 mr-2" for="tahun">Tahun Anggaran :</label>
        <input type="number" class="form-control mr-3" v-model="periodeTahun" />
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click.prevent="showAdd()">Tambahkan Anggaran</button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Edit Anggaran</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editStatus ? editAnggaran() : addAnggaran() ">
              <div class="col-sm">
                <label class="my-1 mr-2" for="Username">Jenis Transaksi</label>
                <div class="input-group">
                  <select class="form-control" v-model="JenisTransaksiId" required>
                    <option selected disabled>Pilih Jenis Transaksi</option>
                    <option
                      v-for="jenis in this.jenisTransaksi"
                      :key="jenis.id"
                      :value="jenis.id"
                    >{{jenis.namaJenis}}</option>
                  </select>
                </div>
              </div>

              <div class="col-sm">
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
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Mata Anggaran</label>
                <div class="input-group">
                  <select class="form-control" v-model="MataAnggaranId" required>
                    <option
                      v-for="ma in getMa()"
                      :key="ma.id"
                      :value="ma.id"
                    >{{ma.namaMataAnggaran}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Tahun</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    v-model="tahun"
                    required
                    placeholder="Tahun"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Jumlah</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    v-model="jumlah"
                    required
                    placeholder="Jumlah (Rp.)"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit -->

    <div class="table2">
      <div class="tableView justify-self-center">
        <!-- <div class="col justify-content-md-center"> -->
        <table class="table table-hover table-striped table-borderless" id="pemasukanTable">
          <thead>
            <tr>
              <th>Kelompok Mata Anggaran</th>
              <th scope="col">Mata Anggaran</th>
              <th>Tahun</th>
              <th>Jumlah</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ma in getAnggaran()" :key="ma.id">
              <td>{{ma.KelompokMA.namaKelMa}}</td>
              <td>{{ma.MataAnggaran.namaMataAnggaran}}</td>
              <td id="uang">{{ma.tahun}}</td>
              <td id="uang">{{ formatUang(ma.jumlah)}}</td>
              <td id="action">
                <button title="Edit" type="button" @click.prevent="openEditPage(ma)">
                  <i class="fas fa-edit"></i>
                </button>
                <a @click.prevent="confirmDelete(ma.id)">
                  <i class="fas fa-trash-alt" title="hapus"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "RincianMa",
  data() {
    return {
      id: "",
      dataTransaksi: "",
      editStatus: false,
      MataAnggaranId: 0,
      tahun: "",
      kelMaList: [],
      JenisTransaksiId: 0,
      KelompokMAId: 0,
      namaMataAnggran: "",
      code: "",
      periodeTahun: 2021
    };
  },

  computed: {
    jenisTransaksi() {
      return this.$store.state.jenisTransaksi;
    },
    kelMa() {
      return this.$store.state.kelMa;
    },
    saldoUser() {
      return this.$store.state.saldoUser;
    },
    mataAnggaran() {
      return this.$store.state.mataAnggaran;
    },
    transaksiUser() {
      return this.$store.state.transaksiUser;
    },
    anggaranUser() {
      return this.$store.state.anggarans;
    }
  },
  methods: {
    showAdd() {
      $("#staticBackdrop").modal("show");
      this.tahun = 0;
      this.JenisTransaksiId = 0;
      this.KelompokMAId = 0;
      this.namaMataAnggran = "";
      this.code = "";
      this.jumlah = 0;
      this.MataAnggaranId = 0;
      this.editStatus = false;
    },
    openEditPage(data) {
      $("#staticBackdrop").modal("show");
      this.id = data.id;
      this.tahun = data.tahun;
      this.JenisTransaksiId = data.JenisTransaksiId;
      this.KelompokMAId = data.KelompokMAId;
      this.code = "";
      this.MataAnggaranId = data.MataAnggaranId;
      this.jumlah = data.jumlah;
      this.editStatus = true;
    },
    formatUang(data) {
      // console.log(data, "dataa");
      let uang = "";
      data = data.toString();
      for (let i = 0; i < data.length; i++) {
        if ((data.length - i) % 3 == 0 && i !== 0) {
          uang += `.${data[i]}`;
        } else {
          uang += data[i];
        }
      }
      return uang;
    },
    getAnggaran() {
      let hasil = [];

      this.anggaranUser?.map(item => {
        if (item.tahun == this.periodeTahun) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    addAnggaran() {
      let data = {
        JenisTransaksiId: this.JenisTransaksiId,
        KelompokMAId: this.KelompokMAId,
        MataAnggaranId: this.MataAnggaranId,
        jumlah: this.jumlah,
        tahun: this.tahun
      };
      return axios
        .post("/transaksi/anggaran", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
          $("#staticBackdrop").modal("hide");

          Swal.fire("Terima Kasih", "Anggaran telah ditambahkan", "success");
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    },
    editAnggaran() {
      return axios
        .put(
          `/transaksi/anggaran/${this.id}`,
          {
            JenisTransaksiId: this.JenisTransaksiId,
            KelompokMAId: this.KelompokMAId,
            MataAnggaranId: this.MataAnggaranId,
            jumlah: this.jumlah,
            tahun: this.tahun
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
          Swal.fire(
            "Terima Kasih",
            "Anggaran Telah Berhasil diubah",
            "success"
          );
          $("#staticBackdrop").modal("hide");
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
          this.$store.dispatch("getAnggaran");
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    },
    getKelMa() {
      let hasil = [];

      this.kelMa?.map(item => {
        if (item.JenisTransaksiId == this.JenisTransaksiId) {
          hasil.push(item);
        }
      });

      return hasil;
    },
    getMa() {
      let hasil = [];
      this.mataAnggaran?.map(item => {
        if (item.KelompokMAId == this.KelompokMAId) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getKelMaEdit() {
      let hasil = [];

      this.kelMa?.map(item => {
        if (item.JenisTransaksiId == this.JenisTransaksiIdEdit) {
          hasil.push(item);
        }
      });

      return hasil;
    },
    getMaEdit() {
      let hasil = [];
      this.mataAnggaran?.map(item => {
        if (item.KelompokMAId == this.KelompokMAIdEdit) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Yakin?",
        text: "Apakah Yakin ",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!!"
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteAnggaran(id);
          this.$store.dispatch("getAnggaran");
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          // this.$router.push("/report/transaksi");
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    },
    deleteAnggaran(id) {
      return axios
        .delete(`/transaksi/anggaran/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("getAnggaran");
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    }
  },
  created() {
    this.$store.dispatch("fetchJenisTransaksi");
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getMataAnggaran");
    this.$store.dispatch("getAnggaran");
  }
};
</script>

<style scoped>
#action {
  text-align: center;
}
#action button {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  font-size: 15px;
}
.modal-body label {
  text-align: left;
}
.table2 {
  min-width: 85vw;
  justify-content: center;
}

.tableView {
  padding: 25px;
  max-height: 600px;
  overflow-x: scroll;
  overflow-y: scroll;
  justify-self: center;
}
#uang {
  text-align: right;
}
table {
  min-width: 500px;
}

#code {
  text-align: right;
}
th {
  text-align: center;
}
td,
th {
  font-size: 14px;
  padding: 5px 2px;
}
td {
  text-align: left;
}
#head {
  text-align-last: left;
}
@media screen and (max-width: 800px) {
  .tableView {
    margin-top: 20px;
    padding: 30px;
    font-size: 11px;
    max-height: 600px;
  }
  input {
    text-align: center;
  }
  td,
  th {
    font-size: 12px;
    padding: 2px 2px;
  }
}
</style>