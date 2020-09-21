<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense v-if="loggedIn">
        <v-list-item @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-for="link in links" :key="link.title" v-else>
        <v-list-item :to="link.url">
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          <h1 class="orange--text pointer">AutoBazar</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        to="/orders"
        class="hidden-sm-and-down"
        color="orange accent-2 mr-5  black--text"
        v-if="loggedIn"
      >
        <v-icon left>mdi-exit-to-app</v-icon>Orders
      </v-btn>
      <v-btn
        v-if="loggedIn"
        class="hidden-sm-and-down"
        color="orange accent-2 black--text"
        @click="onLogout"
      >
        <v-icon left>mdi-exit-to-app</v-icon>Logout
      </v-btn>
      <v-btn
        v-else
        class="hidden-sm-and-down"
        app
        color="orange accent-2 mr-5 black--text"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
      >
        <v-icon left>{{link.icon}}</v-icon>
        {{link.title}}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data: () => ({
    drawer: null,
    loggedIn: false,
  }),
  computed: {
    links() {
      return [
        { title: "Login", icon: "mdi-login", url: "/login" },
        { title: "Sign up", icon: "mdi-face", url: "/registration" },
      ];
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.loggedIn = false;
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
