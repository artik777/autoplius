<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" sm="8" md="5">
        <v-card class="elevation-12">
          <v-toolbar color="teal" dark flat>
            <v-toolbar-title>Register form</v-toolbar-title>
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
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                color="teal"
                :counter="24"
                type="password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                label="Confirm password"
                name="confirm-password"
                prepend-icon="mdi-lock"
                color="teal"
                :counter="24"
                type="password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="teal"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              class="teal white--text"
            >Register</v-btn>
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
      confirmPassword: "",
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
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.password || "Password should match",
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
        confirmPassword: this.confirmPassword,
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>