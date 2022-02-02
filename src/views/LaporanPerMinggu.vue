<template>
  <div class="ReportBulanan">
    <h2 class="mt-4 mb-2">Laporan Bulanan</h2>
    <div class="row justify-content-center mt-3 mb-3">
      <div class="input-group col-sm col-lg-5">
        <label class="my-1 mr-2" for="Username">Tanggal :</label>
        <input type="date" class="form-control mr-3" v-model="startDate" /> -
        <input type="date" class="form-control ml-3" v-model="endDate" />
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col col-lg-8 justify-content-md-center">
        <button class="btn" @click.prevent="tableHtmlToExcel('reportMingguan')">
          <i class="fa fa-download"></i> Download
        </button>
        {{this.startDate}}
        <table class="table table-striped table-hover table-bordered" id="reportMingguan">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">Kelompok Mata Anggaran</th>
              <th scope="col">Nilai</th>
              <th scope="col">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th id="head">Saldo Awal</th>
              <td></td>
              <th id="uang">{{formatUang(getSaldoAwal())}}</th>
            </tr>
            <tr>
              <td></td>
              <th id="head">Total Pemasukan</th>
              <td></td>
              <th id="uang">{{ formatUang(getTotalPemasukan())}}</th>
            </tr>
            <tr>
              <td></td>
              <th id="head">Saldo Awal + Pemasukan</th>
              <td></td>
              <th id="uang">{{ formatUang(getTotalPemasukan() + getSaldoAwal())}}</th>
            </tr>
            <tr>
              <td></td>
              <th id="head">Pengeluaran</th>
              <td></td>
              <th id="uang">{{ formatUang(getTotalPengeluaran())}}</th>
            </tr>
            <tr>
              <td></td>
              <th id="head">Saldo Akhir</th>
              <td></td>
              <th id="uang">{{ formatUang(getSaldoAkhir())}}</th>
            </tr>
            <tr v-for="kel in getMaPemasukan()" :key="kel.id">
              <td>{{kel.code}}</td>
              <td>{{kel.namaKelMa}}</td>

              <td id="uang">{{ formatUang(getJumlah(kel['Transaksis'])) }}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th id="head">Total Pemasukan</th>
              <td></td>
              <th id="uang">{{ formatUang(getTotalPemasukan())}}</th>
            </tr>
            <tr v-for="kel in getMaPengeluaran()" :key="kel.id">
              <td>{{kel.code}}</td>
              <td>{{kel.namaKelMa}}</td>

              <td id="uang">{{ formatUang(getJumlah(kel['Transaksis'])) }}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th id="head">Total Pengeluaran</th>
              <td></td>
              <th id="uang">{{ formatUang(getTotalPengeluaran())}}</th>
            </tr>
            <tr>
              <td></td>
              <th id="head">Saldo Akhir</th>
              <td></td>
              <th id="uang">{{ formatUang(getSaldoAkhir())}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- {{getSaldoAwal()}} -->
  </div>
</template>

<script>
import axios from "../API/axios";
import VueMonthlyPicker from "vue-monthly-picker";
import moment from "moment";
export default {
  name: "ReportBulanan",
  data() {
    return {
      selectedMonth: "",
      startDate: "",
      endDate: ""
    };
  },

  computed: {
    kelMa() {
      return this.$store.state.kelMa;
    },
    saldoUser() {
      return this.$store.state.saldoUser;
    },
    transaksiUser() {
      return this.$store.state.transaksiUser.rows;
    }
  },
  methods: {
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
    getJumlah(data) {
      let hasil = 0;
      data?.map(item => {
        let start = moment(this.startDate, "YYYY/MM/DD") - 1;
        let end = moment(this.endDate, "YYYY/MM/DD") + 1;
        let tanggalItem = moment(item.tanggalTransaksi, "YYYY/MM/DD");
        if (tanggalItem.isBetween(start, end) == true) {
          hasil += +item.jumlah;
        }
      });
      return hasil;
    },
    getMaPemasukan() {
      let hasil = [];
      this.kelMa?.map(item => {
        if (item.JenisTransaksiId == 1) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getMaPengeluaran() {
      let hasil = [];
      this.kelMa?.map(item => {
        if (item.JenisTransaksiId == 2) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getTotalPemasukan() {
      let hasil = 0;
      this.transaksiUser.map(item => {
        let tanggal = moment(item.tanggalTransaksi, "YYYY/MM/DD");
        let start = moment(this.startDate, "YYYY/MM/DD") - 1;
        let end = moment(this.endDate, "YYYY/MM/DD") + 1;
        if (tanggal < end && tanggal > start && item.JenisTransaksiId == 1) {
          hasil += +item.jumlah;
        }
      });
      return hasil;
    },
    getTotalPengeluaran() {
      let hasil = 0;
      this.transaksiUser.map(item => {
        let tanggal = moment(item.tanggalTransaksi, "YYYY/MM/DD");
        let start = moment(this.startDate, "YYYY/MM/DD") - 1;
        let end = moment(this.endDate, "YYYY/MM/DD") + 1;
        if (tanggal < end && tanggal > start && item.JenisTransaksiId == 2) {
          hasil += +item.jumlah;
        }
      });
      return hasil;
    },
    getSaldoAwal() {
      let bulan = moment(this.selectedMonth).get("month") + 1;
      let tahun = moment(this.selectedMonth).get("year");
      let hasil = 0;
      this.saldoUser?.map(item => {
        if (tahun == item.tahun && item.bulan < bulan) {
          hasil += +item.jmlhSaldo;
        } else if (item.tahun < tahun) {
          hasil += +item.jmlhSaldo;
        }
      });
      return hasil;
    },
    getSaldoAkhir() {
      let hasil = 0;
      hasil =
        this.getSaldoAwal() +
        this.getTotalPemasukan() -
        this.getTotalPengeluaran();
      return hasil;
    },
    periode() {
      let hasil = "";
      if (!this.startDate || !this.endDate) {
        hasil = "-";
      } else {
        hasil = `${this.startDate} sampai ${this.endDate}`;
      }
      return hasil;
    },
    tableHtmlToExcel(
      tableID,
      filename = `Laporan Jem. ${this.namaJemaat} Periode ${this.periode()}`
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
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getTransaksiUser");
    this.$store.dispatch("getSaldo");
  }
};
</script>

<style scoped>
.ReportBulanan {
  width: 85vw;
}
thead tr {
  /* background-color: #1b9aaa; */
  color: #0040b8;
  font-weight: normal;
  font-size: 14px;
}
#uang {
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
  .ReportBulanan {
    padding-left: 10px;
  }
}
</style>