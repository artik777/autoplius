<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-img class="cover" height="600px" :src="ad.imageSrc"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn class="teal white--text">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
  },
};
</script>

