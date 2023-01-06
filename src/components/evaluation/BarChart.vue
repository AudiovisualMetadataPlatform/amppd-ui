<template>
  <div class="con">
    <div class="myChart" style="width: 100%;">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "BarChart",
  components: {},
  data() {
    return {};
  },
  props: {
    data: {
      default: {
        labels: [],
        datasets: [],
      },
    },
  },
  mounted() {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: this.data,
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
