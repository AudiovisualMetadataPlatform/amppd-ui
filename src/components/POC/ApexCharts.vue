<template>
  <div class="example">
    <p>
      <label><b>Select Theme Palette</b> </label> &nbsp;
      <select @change="updateTheme">
        <option value="palette1">palette1</option>
        <option value="palette2">palette2</option>
        <option value="palette3">palette3</option>
        <option value="palette4">palette4</option>
        <option value="palette5">palette5</option>
        <option value="palette6">palette6</option>
        <option value="palette7">palette7</option>
        <option value="palette8">palette8</option>
        <option value="palette9">palette9</option>
        <option value="palette10">palette10</option>
      </select>
    </p>
    <apexcharts
      width="100%"
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "ApexCharts",
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },

      /* chartOptions: {
        chart: {
          id: "basic-bar",
          animations: {
            speed: 200
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            distributed: true
          }
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 30, 49]
        }
      ] */
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value,
        },
      };
    },
  },
};
</script>
