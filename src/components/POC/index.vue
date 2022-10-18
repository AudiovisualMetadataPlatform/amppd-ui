<template>
  <div class="con">
    <h2 class="mt-3 mb-4">"Proof Of Concept"</h2>
    <!-- https://www.youtube.com/watch?v=aw8d2f3xfPA&ab_channel=SimonSuh -->
    <div class="myChart" style="width: 800px; height: 415px;">
      <canvas id="myChart"></canvas>
    </div>
    <h3 class="mb-4">Chart.js with Vue.js</h3>
    <!-- https://www.youtube.com/watch?v=e80oj7xzLI4&ab_channel=MachineLoveUs -->
    <D3Charts />
    <!-- <ApexCharts /> -->
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import D3Charts from "./D3Charts.vue";
// import ApexCharts from "./ApexCharts.vue";

export default {
  name: "POC",
  components: {
    D3Charts,
    // ApexCharts,
  },
  data() {
    return {};
  },
  mounted() {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Overall Precision", "Overall Recall", "Overall F1"],
        datasets: [
          {
            label: "Test File 1",
            backgroundColor: "rgba(207, 0, 16, 0.66",
            data: [0.78, 0.92, 0.86],
          },
          {
            label: "Test File 2",
            backgroundColor: "rgba(15, 10, 222, 0.66",
            data: [0.59, 0.85, 0.65],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Population growth (millions)",
        },
      },
    });
    myChart;
  },
};
</script>

<style>
.con {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
