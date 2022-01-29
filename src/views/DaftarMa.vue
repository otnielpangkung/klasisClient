<template>
  <div class="RincianMa">
    <h2 class="mt-4 mb-2">Rincian Mata Anggaran ZZ</h2>
    <!-- {{getKelMa()}} -->
    <button type="button" class="btn btn-primary" @click.prevent="showAdd">Tambahkan Mata Anggaran</button>
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
            <h5 class="modal-title" id="staticBackdropLabel">Tambah Mata Anggaran</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addMataAnggaran">
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
                <label class="my-1 mr-2" for="kelompokMA">Nama Mata Anggaran</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="namaMataAnggaran"
                    required
                    placeholder="Nama Mata Anggaran"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Code Mata Anggaran</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="code"
                    required
                    placeholder="Code"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal edit -->
    <div class="modal fade" id="modalEdit" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="editKelMa">
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Nama Mata Anggaran</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="namaMataAnggaran" required />
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Code Kel. Mata Anggaran</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="code"
                    required
                    placeholder="Code"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="table2 row">
      <div class="tableView justify-self-center">
        <!-- <div class="col justify-content-md-center"> -->
        <table class="table table-hover table-striped table-borderless" id="pemasukanTable">
          <thead>
            <tr>
              <th scope="col">Mata Anggaran</th>
              <th>Code</th>
              <th>KelompokMA</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ma in this.mataAnggaran" :key="ma.id">
              <td>{{ma.namaMataAnggaran}}</td>
              <td id="code">{{ma.code}}</td>
              <td id="code">{{ma.KelompokMA.namaKelMa}}</td>
              <td id="code">
                <a @click.prevent="showEdit(ma)">
                  <i class="fas fa-edit" title="edit"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- </div> -->
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
      tahun: 2021,
      id: 0,
      kelMaList: [],
      JenisTransaksiId: 0,
      KelompokMAId: 0,
      namaMataAnggaran: "",
      code: ""
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
    }
  },
  methods: {
    showAdd() {
      $("#staticBackdrop").modal("show");
      this.JenisTransaksiId = 0;
      this.KelompokMAId = 0;
      this.namaMataAnggaran = "";
      this.code = "";
    },
    editKelMa() {
      let data = {
        namaMataAnggaran: this.namaMataAnggaran,
        code: this.code
      };
      return axios
        .put(`/database/mataanggaran/${this.id}`, data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          Swal.fire("Terima Kasih", "Data Berhasil diubah", "success");
          this.$store.dispatch("fetchKelMa");
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getMataAnggaran");
          this.namaMataAnggaran = "";
          this.code = "";
          this.id = "";
          $("#modalEdit").modal("hide");
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    },
    showEdit(item) {
      $("#modalEdit").modal("show");
      this.namaMataAnggaran = item.namaMataAnggaran;
      this.code = item.code;
      this.id = item.id;
    },
    addMataAnggaran() {
      let data = {
        JenisTransaksiId: this.JenisTransaksiId,
        KelompokMAId: this.KelompokMAId,
        code: this.code,
        namaMataAnggaran: this.namaMataAnggaran
      };
      return axios
        .post("/database/mataanggaran", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          Swal.fire(
            "Terima Kasih",
            "Mata Anggaran telah ditambahkan",
            "success"
          );
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getMataAnggaran");
          this.$store.dispatch("getMataAnggaran");
          $("#staticBackdrop").modal("hide");
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
      this.mataanggaran?.map(item => {
        if (item.KelompokMAId == this.KelompokMAId) {
          hasil.push(item);
        }
      });
      return hasil;
    }
  },
  created() {
    this.$store.dispatch("fetchJenisTransaksi");
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getMataAnggaran");
  }
};
</script>

<style scoped>
.modal-body label {
  text-align: left;
}
.table2 {
  justify-content: center;
}

.tableView {
  padding: 25px;
  max-width: 100vw;
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