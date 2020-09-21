<template>
  <div>
    <div v-if="!loading">
      <v-container fluid>
        <v-layout>
          <v-flex xs12>
            <v-carousel height="400px">
              <v-carousel-item
                v-for="ad in promoAds"
                :key="ad.id"
                :src="ad.imageSrc"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <div class="carousel-link">
                  <v-btn class="orange accent-2 black--text" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout class="align-center">
          <HomeSelect />
          <HomeFilterBrand />
          <HomeFilterCity class="ml-3" />
        </v-layout>
      </v-container>
      <HomeItems />
      <HomePagination />
    </div>
    <v-container class="h100" fill-height v-else>
      <v-layout align-center justify-center>
        <v-progress-circular indeterminate color="green" :width="4" :size="100"></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import HomeItems from "../components/home/HomeItems";
import HomePagination from "../components/home/HomePagination";
import HomeSelect from "../components/home/HomeSelect";
import HomeFilterBrand from "../components/home/HomeFilterBrand";
import HomeFilterCity from "../components/home/HomeFilterCity.vue";

export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  components: {
    HomeItems,
    HomePagination,
    HomeSelect,
    HomeFilterBrand,
    HomeFilterCity,
  },
};
</script>

<style scoped>
.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 10px 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>