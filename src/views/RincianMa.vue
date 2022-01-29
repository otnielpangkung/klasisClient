<template>
  <div class="RincianMa">
    <h2 class="mt-4 mb-2">Rincian Mata Anggaran</h2>
    <div class="input-group mb-3 justify-content-center">
      <div class="col col-lg-2">
        <label class="my-1 mr-2" for="tahun">Tahun :</label>
        <input type="number" class="form-control mr-3" v-model="tahun" />
      </div>
    </div>
    <div class="table2 row">
      <div class="tableView justify-self-center">
        <button
          title="Download Tabel"
          class="btn"
          @click.prevent="tableHtmlToExcel('pemasukanTable')"
        >
          <i class="fa fa-download"></i> Download
        </button>
        <!-- <div class="col justify-content-md-center"> -->
        <table class="table table-hover table-striped table-bordered" id="pemasukanTable">
          <thead>
            <tr>
              <th scope="col">Mata Anggaran</th>
              <th>Code</th>
              <th>Anggaran</th>
              <th scope="col">Realisasi</th>
              <th scope="col">Selisih</th>
              <th>Janari</th>
              <th>Februari</th>
              <th>Maret</th>
              <th>April</th>
              <th>Mei</th>
              <th>Juni</th>
              <th>Juli</th>
              <th>Agustus</th>
              <th>September</th>
              <th>Oktober</th>
              <th>November</th>
              <th>Desember</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ma in this.mataAnggaran" :key="ma.id">
              <td id="mataAnggaran">{{ma.namaMataAnggaran}}</td>
              <td id="code">{{ma.code}}</td>
              <td id="code">{{ formatUang(getAnggaran(ma.Anggarans)) }}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 13))}}</td>
              <td
                id="uang"
              >{{formatUang(selisihAnggaran(getJumlah(ma.Transaksis, 13),getAnggaran(ma.Anggarans)))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 1))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 2))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 3))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 4))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 5))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 6))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 7))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 8))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 9))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 10))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 11))}}</td>
              <td id="uang">{{formatUang(getJumlah(ma.Transaksis, 12))}}</td>
            </tr>
          </tbody>
        </table>
        <!-- </div> -->
      </div>
    </div>
    <!-- {{this.mataAnggaran}} -->
  </div>
</template>

<script>
import axios from "../API/axios";
import moment from "moment";
export default {
  name: "RincianMa",
  data() {
    return {
      tahun: 2021
    };
  },

  computed: {
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
      return this.$store.state.transaksiUser.rows;
    },
    namaJemaat() {
      return localStorage.getItem("namaJemaat");
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
    selisihAnggaran(real, anggaran) {
      if (real == "-") real = 0;
      if (anggaran == "-") anggaran = 0;
      let hasil = 0;
      if (!real && !anggaran) {
        hasil = 0;
      } else {
        hasil = anggaran - real;
      }
      return hasil;
    },
    getAnggaran(data) {
      let hasil = 0;
      data?.map(item => {
        if (item.tahun == this.tahun) {
          hasil = +item.jumlah;
        }
      });
      if (hasil == 0) {
        hasil = "-";
      }
      return hasil;
    },
    getJumlah(data, bulanTem) {
      let hasil = 0;
      data?.map(item => {
        let bulan = Number(moment(item.tanggalTransaksi).get("month") + 1);
        let tahun = moment(item.tanggalTransaksi).get("year");
        if (bulanTem < 13) {
          if (bulanTem == bulan && tahun == this.tahun) {
            hasil += +item.jumlah;
          }
        } else {
          if (tahun == this.tahun) {
            hasil += +item.jumlah;
          }
        }
      });
      if (hasil == 0) {
        hasil = "-";
      }
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
    tableHtmlToExcel(
      // Download Transaksi
      tableID,
      filename = `Rincian Laporan Tahunan Jem. ${this.namaJemaat} Tahun ${this.tahun}`
    ) {
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
    this.$store.dispatch("getMataAnggaran");
  }
};
</script>

<style scoped>
.RincianMa {
  width: 85vw;
}
.table2 {
  justify-content: center;
}
#mataAnggaran {
  max-width: 150px;
}
.tableView {
  padding-left: 10px;
  width: 85vw;
  max-height: 600px;
  overflow-x: scroll;
  overflow-y: scroll;
  justify-self: center;
}
#uang {
  text-align: right;
}
table {
  min-width: 2000px;
}
thead th {
  text-align: center;
}
#code {
  text-align: right;
  max-width: 20px;
}
td,
th {
  font-size: 12px;
  padding: 5px 2px;
}
td {
  text-align: left;
}
#head {
  text-align-last: left;
}
</style>