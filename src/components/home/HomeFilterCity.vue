<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>City</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="({name, display}, index) in filters2" :key="index">
            <input type="checkbox" :checked="display" @change="toggleFilter2(name)" />
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
      filters2: "getFilters2",
    }),
  },
  methods: {
    ...mapActions({
      toggleFilter2: "filterItems2",
    }),
  },
};
</script>

