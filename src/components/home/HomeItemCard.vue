<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="200px" :src="imageSrc">
      <v-card-title>{{title}}</v-card-title>
    </v-img>
    <v-card-title class="pb-0">
      {{
      new Intl.NumberFormat("lt", {
      style: "currency",
      currency: "EUR",
      maximumDecimalPlaces: 0,
      }).format(price)
      }}
    </v-card-title>
    <v-card-title class="pb-0">{{city}}</v-card-title>
    <v-card-text class="text--primary">
      <div>{{description}}</div>
    </v-card-text>
    <v-chip class="ma-2" color="secondary">{{brand}}</v-chip>
    <v-chip :color="statusColor(currentStatus)" class="white--text ma-2">{{currentStatus}}</v-chip>
    <v-card-actions>
      <v-spacer></v-spacer>
      <template>
        <v-btn color="teal" dark class="mb-2" text :to="'/ad/' + id ">Open</v-btn>
      </template>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="currentStatus == 'Reserved'"
            color="teal"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >Buy</v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-img class="white--text align-end" height="200px" :src="imageSrc"></v-img>
                  <v-card-title class="pa-0">{{title}}</v-card-title>
                  <v-card-subtitle class="pa-0 ma-0">{{"Price: " + price + " Eur"}}</v-card-subtitle>
                  <v-card-subtitle class="pa-0 ma-0">{{"Id number: " + id}}</v-card-subtitle>
                  <v-text-field v-model="phone" label="Your phone number"></v-text-field>
                  <v-text-field v-model="name" label="Your name"></v-text-field>
                  <v-text-field v-model="surname" label="Your surname"></v-text-field>
                  <v-text-field v-model="address" label="Your address"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" @click="close">Cancel</v-btn>
            <v-btn
              :disabled="disabled || !loggedIn"
              color="teal"
              class="white--text"
              @click="buy"
            >Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  props: ["id", "imageSrc", "title", "price", "description", "brand", "city"],
  data: () => ({
    dialog: false,
    phone: "",
    name: "",
    surname: "",
    address: "",
    currentStatus: "Available",
    status: "Reserved",
    disabled: false,
    loggedIn: false,
    numberRules: [
      (v) => !!v || "Field is required",
      (v) => /^\d+$/.test(v) || "Must be a number",
    ],
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });
    fetch("https://rapicode.herokuapp.com/api/orders")
      .then((response) => response.json())
      .then((data) => {
        data.map((e) => {
          let included = this.id.includes(e.ordernr);
          if (included) {
            this.currentStatus = e.status;
          }
        });
      });
  },
  methods: {
    close() {
      this.dialog = false;
    },

    buy() {
      confirm(
        `Are sure that you want to buy this ${this.title} for ${this.price} euros ?`
      ) && this.close();
      fetch("https://rapicode.herokuapp.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          surname: this.surname,
          title: this.title,
          price: this.price,
          ordernr: this.id,
          phone: this.phone,
          email: firebase.auth().currentUser.email,
          address: this.address,
          computer: navigator.userAgent,
          status: this.status,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          this.error = true;
          this.errorMessage = `You have successfully added a name to the DB`;
          this.disabled = true;
          this.phone = "";
          this.name = "";
          this.surname = "";
          this.address = "";
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
        });
    },
    statusColor(status) {
      if (status == "Reserved") return "orange";
      else if (status == "Sold") return "red";
      else return "green";
    },
  },
};
</script>

