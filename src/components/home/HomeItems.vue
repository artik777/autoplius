<template>
  <v-container grid-list-lg>
    <Search v-on:search="(query) => (filter = query)" />
    <v-layout wrap>
      <v-flex md6 lg4 xl3 v-for="ad in ads" :key="ad.id">
        <ItemCard
          :id="ad.id"
          :key="ad.id"
          :imageSrc="ad.imageSrc"
          :title="ad.title"
          :price="ad.price"
          :description="ad.description"
          :brand="ad.brand"
          :city="ad.city"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Search from "./HomeSearch";
import ItemCard from "./HomeItemCard";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    ...mapGetters({
      items: "getSelectedItems",
    }),
    ads() {
      return this.items.filter((ad) =>
        ad.title.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },
  components: { Search, ItemCard },
};
</script>

