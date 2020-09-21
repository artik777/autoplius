<template>
  <div>
    <select class="pointer" @change="changeItemsPerPageOption($event.target.value)">
      <option
        v-for="({count, selected}, i) in itemsPerPageOptions"
        :key="i"
        :value="count"
        :selected="selected"
      >{{count}}</option>
    </select>
    <select class="pointer" v-if="count > 1" @change="changeSortOption($event.target.value)">
      <option
        v-for="({name, selected}, i) in sortOptions"
        :key="i"
        :value="name"
        :selected="selected"
      >{{name}}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      count: "getItemCount",
      itemsPerPageOptions: "getItemsPerPageOptions",
      sortOptions: "getSortOptions",
    }),
  },
  methods: mapActions(["changeItemsPerPageOption", "changeSortOption"]),
};
</script>

<style scoped>
select {
  margin-right: 10px;
  padding: 12px;
  outline: none;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.pointer {
  cursor: pointer;
}
</style>