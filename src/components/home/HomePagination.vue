<template>
  <v-row justify="center">
    <div
      class="pagination"
      v-for="({number}, i ) in pagination.pages"
      :class="{active: number == pagination.currentPage}"
      :key="i"
      @click="setPage(number)"
    >{{number}}</div>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    pagination: "getPagination",
  }),
  methods: {
    setPage(number) {
      this.$store.dispatch("setPage", number);
    },
  },
};
</script>


<style lang="scss" scoped>
.pagination {
  margin: 0 10px 10px 0;
  border: 1px solid black;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
.pagination:last-child {
  margin-right: 0;
}
.pagination:hover {
  color: orange;
}
.pagination.active {
  background: teal;
  color: white;
}
</style>
