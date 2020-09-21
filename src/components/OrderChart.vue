<template>
  <div class="chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales",
          backgroundColor: "orange",
          data: [3, 20, 5, 7, 3, 1, 3, 20, 5, 7, 3, 1],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>


<style scoped>
.chart {
  height: 500px;
}
</style>