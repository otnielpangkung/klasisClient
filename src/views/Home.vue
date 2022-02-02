<template>
  <div class="home">
    <b-col align-self="center" align-v="center">
      <b-row align-h="around" class="justify-content-md-center mt-5">
        <b-col>
          <h1>Pemasukan</h1>
          <vue-apex-charts width="500" type="line" :options="option" :series="value"></vue-apex-charts>
        </b-col>

        <b-col>
          <h1>Pengeluaran</h1>
          <vue-apex-charts
            width="500"
            type="line"
            :options="optionKeluaran"
            :series="valueKeluaran"
          ></vue-apex-charts>
        </b-col>
      </b-row>
    </b-col>

    <b-table></b-table>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import moment from "moment";
export default {
  name: "Home",
  components: {
    VueApexCharts
  },
  data: function() {
    return {};
  },
  computed: {
    transaksiUser() {
      return this.$store.state.transaksiUser.rows;
    },
    value() {
      const penm = [
        {
          name: "series-1",
          data: this.$store.state.dataMasukan.value
        }
      ];
      return penm;
    },
    option() {
      return {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: this.$store.state.dataMasukan.hasilTahun
        }
      };
    },
    valueKeluaran() {
      const penm = [
        {
          name: "series-1",
          data: this.$store.state.dataKeluaran.value
        }
      ];
      return penm;
    },
    optionKeluaran() {
      return {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: this.$store.state.dataKeluaran.hasilTahun
        }
      };
    }
  },

  created() {
    this.$store.dispatch("getTransaksiUser");
    this.$store.dispatch("getTransaksiUser");
    this.$store.dispatch("fetchJenisTransaksi");
    this.$store.dispatch("fetchKelMa");
    this.$store.dispatch("getMataAnggaran");
    this.$store.dispatch("getTransaksiUser");
    // this.dataMasukan();
  }
};
</script>

<style scoped>
.home {
  width: 85vw;
}
</style>