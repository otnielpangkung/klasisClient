<template>
  <div class="overflow-auto mt-2">
    <b-row>
      <b-button
        v-if="this.role == 'bendahara'"
        @click.prevent="showAdd()"
        variant="outline-primary"
        class="mb-2 ml-5"
      >Tambah Transaksi</b-button>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Cari"
          label-for="filter-input"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Masukkan Kata yang ingin dicari"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-pagination
        class="ml-3"
        v-model="currentPage"
        :total-rows="filterData().length"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <div class="input-group col-sm col-lg-5">
        <label class="my-1 mr-2" for="Username">Tanggal :</label>
        <input type="date" class="form-control mr-3" v-model="startDate" /> -
        <input type="date" class="form-control ml-3" v-model="endDate" />
      </div>
      <button class="btn" @click.prevent="tableHtmlToExcel('my-table')">
        <i class="fa fa-download"></i> Download
      </button>
    </b-row>

    <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->
    <div class="tableView" :key="rerenderTransaksi">
      <b-table
        bordered
        :filter="filter"
        id="my-table"
        :items="filterData()"
        striped
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <template #cell(test)="row">{{row.item.id }}</template>
        <template #cell(KelompokMA.namaKelMa)="row">{{ row.value }}</template>
        <template #cell(debet)="row">{{ formatUang(row.item, "debet") }}</template>
        <template #cell(kredit)="row">{{ formatUang(row.item, "kredit") }}</template>
        <!-- <template #cell(MataAnggaran.namaMataAnggaran)="row">{{ row.value }}</template> -->
        <template #cell(tanggalTransaksi)="row">{{ formatTanggal(row.value) }}</template>
        <!-- <template #cell(cek)="row">{{ testAja(row.item) }}</template> -->
        <template #cell(id)="row">
          <a @click.prevent="confirmDelete(row.value)">
            <i class="fas fa-trash-alt" title="hapus"></i>
          </a>
          <a @click.prevent="showEdit(row.item)">
            <i class="fas fa-edit" title="edit"></i>
          </a>
        </template>
      </b-table>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="filterData().length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="editStatus ? editTransaksi() : inputTransaksi()">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import Swal from "sweetalert2";

import axios from "../API/axios";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      editStatus: false,
      startDate: "",
      endDate: "",
      showModal: true,
      id: 0,
      namaTransaksi: "",
      keterangan: "",
      tanggalTransaksi: "",
      MataAnggaranId: 0,
      jumlah: 0,
      JenisTransaksiId: 0,
      KelompokMAId: 0,
      keterangan: "",
      filter: null,
      perPage: 20,
      currentPage: 1,
      fields: [
        {
          key: "namaTransaksi",
          label: "Nama Transaksi"
        },
        {
          key: "tanggalTransaksi",
          label: "Tanggal"
        },
        {
          key: "KelompokMA.namaKelMa",
          label: "Nama Kelompok Mata Anggaran"
        },
        {
          key: "MataAnggaran.namaMataAnggaran",
          label: "Nama Mata Anggaran"
        },
        {
          key: "debet",
          label: "Debet",
          class: "text-right"
        },
        {
          key: "kredit",
          label: "Kredit",
          class: "text-right"
        },
        {
          key: "keterangan",
          label: "Keterangan"
        },

        {
          key: "id",
          label: "action"
        }
      ],
      rerenderTransaksi: false
    };
  },
  computed: {
    role() {
      return localStorage.getItem("role");
    },
    transaksiUser() {
      return this.$store.state.transaksiUser;
    },
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
  methods: {
    hasilDk(data) {
      let hasil = {
        debet: 0,
        kredit: 0,
        nn: 0
      };
      data?.map(item => {
        if (item.JenisTransaksiId == 1) {
          hasil.debet += Number(item.jumlah);
        } else if (item.JenisTransaksiId == 2) {
          hasil.kredit += Number(item.jumlah);
        } else hasil.nn += Number(item.jumlah);
      });
      return hasil;
    },

    showAdd() {
      $("#myModal").modal("show");
      this.editStatus = false;
      this.id = 0;
      this.namaTransaksi = "";
      this.keterangan = "";
      this.tanggalTransaksi = "";
      this.MataAnggaranId = 0;
      this.jumlah = 0;
      this.JenisTransaksiId = 0;
      this.KelompokMAId = 0;
      this.keterangan = "";
    },
    showEdit(item) {
      $("#myModal").modal("show");
      this.editStatus = true;
      this.namaTransaksi = item.namaTransaksi;
      this.keterangan = item.keterangan;
      this.JenisTransaksiId = item.JenisTransaksiId;
      this.KelompokMAId = item.KelompokMAId;
      this.MataAnggaranId = item.MataAnggaranId;
      this.tanggalTransaksi = item.tanggalTransaksi;
      this.jumlah = item.jumlah;
      this.id = item.id;
      console.log(item, "***");
    },
    filterData() {
      let hasil = [];
      if (!this.startDate || !this.endDate) {
        hasil = this.transaksiUser.rows;
      } else {
        this.transaksiUser.rows?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;

          let tanggalItem = moment(item.tanggalTransaksi, "YYYY/MM/DD");
          if (tanggalItem.isBetween(start, end) == true) {
            hasil.push(item);
          }
        });
      }
      return hasil;
    },
    formatTanggal(data) {
      let hasil = "";
      var time = moment(data).format("DD-MM-YYYY h:mm:ss");
      hasil = time.slice(0, 10);
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
          this.deleteTransaksi(id);
          this.$store.dispatch("getTransaksiUser");
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          // this.$router.push("/report/transaksi");
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    },
    editTransaksi(data) {
      alert(data);
      console.log(data);
    },
    deleteTransaksi(id) {
      return axios
        .delete(`/transaksi/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          console.log(data, "==== del");
          this.$store.dispatch("getTransaksiUser");
          // this.$store.dispatch("getTransaksiUser");
        });
    },
    formatUang(data, jns) {
      if (data.JenisTransaksiId == 1 && jns == "debet") {
        data = data.jumlah;
      } else if (data.JenisTransaksiId == 2 && jns == "kredit") {
        data = data.jumlah;
      } else data = "-";

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
        .then(res => {
          alert(res);
          console.log(res);

          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          Swal.fire({
            title: "Berhasil",
            text: "Data Berhasil Ditambahkan",
            icon: "success",
            confirmButtonText: "Ok"
          });

          $("#myModal").modal("hide");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser").then(function() {
            this.rerenderTransaksi = true;
          });
          // console.log(data);
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
          console.log(err);
        });
    },
    editTransaksi() {
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
        .put(`/transaksi/${this.id}`, payload, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          this.$store.dispatch("getTransaksiUser");
          Swal.fire({
            title: "Berhasil",
            text: "Data Berhasil Di Edit",
            icon: "success",
            confirmButtonText: "Ok"
          });

          $("#myModal").modal("hide");
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
    },
    tableHtmlToExcel(
      tableID,
      filename = `Daftar Transaksi ${this.namaJemaat} `
    ) {
      // Download Transaksi
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      filename = filename ? filename + ".xls" : "excel_data.xls";

      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        downloadLink.download = filename;

        downloadLink.click();
      }
    }
  },
  created() {
    this.$store.dispatch("getTransaksiUser");
    this.$store.dispatch("getTransaksiUser");
    this.$store.dispatch("fetchJenisTransaksi");
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getMataAnggaran");
  }
};
</script>

<style scoped>
.tableView {
  width: 85vw;
  max-height: 600px;
  /* overflow-x: scroll; */
  overflow-y: scroll;
  /* justify-self: center; */
}
table {
  min-width: 2800px;
}
</style>