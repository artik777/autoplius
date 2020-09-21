<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" sm="8" md="5">
        <v-card class="elevation-12">
          <v-toolbar color="teal" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                color="teal"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                color="teal"
                :counter="24"
                type="password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              @click="onSubmit"
              class="teal white--text"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail.";
        },
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6 && v.length <= 24) ||
          "Password must have 6 and more characters, but less than 24 characters ",
        (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        (v) => /(?=.*\d)/.test(v) || "Must have one number",
        (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate();
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;
        this.loading = false;
      }
    },
  },
};
</script>