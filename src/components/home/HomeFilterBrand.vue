<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Car Category</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="({name, display}, index) in filters" :key="index">
            <input type="checkbox" :checked="display" @change="toggleFilter(name)" />
            <label for="bracelets">{{name}}</label>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      filters: "getFilters",
    }),
  },
  methods: {
    ...mapActions({
      toggleFilter: "filterItems",
    }),
  },
};
</script>

