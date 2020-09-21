<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" sort-by="price" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Profit</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  name: "Orders",
  data() {
    return {
      dialog: false,
      loading: true,
      search: "",
      headers: [
        { text: "Title", sortable: false, value: "title" },
        { text: "Daikto numeris", sortable: false, value: "ordernr" },
        { text: "Price", sortable: false, value: "price" },
        { text: "10%", sortable: false, value: "" },
        { text: "VAT", value: "vat" },
        { text: "Profit", value: "profit" },
      ],
      items: [],
      selected: [],
      editedIndex: -1,
      editedItem: {
        status: "",
        price: 0,
      },
    };
  },
};
</script>

<style scoped>
</style>