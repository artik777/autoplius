<template>
  <v-text-field
    v-model="query"
    type="search"
    placeholder="Search"
    append-icon="mdi-magnify"
    v-on:keyup="callParent"
  >Search</v-text-field>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    callParent() {
      this.$emit("search", this.query);
    },
  },
};
</script>
