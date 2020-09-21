<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="price"
      :loading="loading"
      class="elevation-1"
      mobile-breakpoint="0"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit order</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              </v-card-actions>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item, item._id)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item, item._id)">mdi-delete</v-icon>
              </template>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.price="{ item }">
        <v-chip :color="priceColor(item.price)" dark>
          {{
          new Intl.NumberFormat("lt", {
          style: "currency",
          currency: "EUR",
          maximumDecimalPlaces: 0,
          }).format(item.price)
          }}
        </v-chip>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item, item._id)">mdi-delete</v-icon>
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
        { text: "Name", sortable: false, value: "name" },
        { text: "Surname", sortable: false, value: "surname" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Daikto numeris", sortable: false, value: "ordernr" },
        { text: "Price", value: "price" },
        { text: "Phone", sortable: false, value: "phone" },
        { text: "Address", sortable: false, value: "address" },
        { text: "Email", sortable: false, value: "email" },
        { text: "Laikas", sortable: false, value: "timestamp" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Actions", value: "actions", sortable: false },
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
  beforeMount() {
    this.loading = true;
    fetch("https://rapicode.herokuapp.com/api/orders")
      .then((response) => response.json())
      .then((data) => {
        this.items = data;
        this.loading = false;
      });
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item); // surandam indexa
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item, id) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1) && //Trina is front endo
        fetch("https://rapicode.herokuapp.com/api/orders/" + id, {
          //Trina is back endo
          method: "DELETE",
        }).then((response) => response.json());
    },
    priceColor(price) {
      if (price > 100000) return "red";
      else if (price > 50000) return "orange";
      else return "green";
    },
    statusColor(status) {
      if (status == "Reserved") return "orange";
      else if (status == "Sold") return "red";
      else return "green";
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
      });
    },

    save() {
      if (this.editedIndex > -1) {
        //Sako jeigu indeksas yra ne -1, nes -1 reiskia kad nieko nera
        let id = this.items[this.editedIndex]._id; // gaunam musu reikalinga id pagal kuri updatinsim
        Object.assign(this.items[this.editedIndex], this.editedItem); //Object asign pakeicia indexo value jeigu i nauja
        fetch("https://rapicode.herokuapp.com/api/orders/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: this.editedItem.price,
            status: this.editedItem.status,
          }),
        }).then((response) => response.json());
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>

<style scoped>
</style>