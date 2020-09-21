<template>
  <div>
    <OrderChart />

    <Order />

    <ProfitTable />
  </div>
</template>

<script>
import Order from "../components/Order.vue";
import ProfitTable from "../components/ProfitTable.vue";
import OrderChart from "../components/OrderChart.vue";
export default {
  components: { Order, ProfitTable, OrderChart },
};
</script>

<style>
</style>