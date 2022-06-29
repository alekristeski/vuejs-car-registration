<template>
  <v-container fluid class="color lighten-5 d-flex justify-center pa-0">
    <v-btn text @click="goBack"> Back </v-btn>
    <v-breadcrumbs :items="items">
      <template #item="{ item }">
        <v-breadcrumbs-item v-if="item.text === 'home'" @click="goHome">
          <a href="#" style="text-decoration: none">
            <v-icon> {{ icons.mdiHome }} </v-icon>
          </a>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item v-else>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>
<script>
import { mdiHome } from "@mdi/js";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      icons: {
        mdiHome,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.color {
  background-color: #eceff1;
}
</style>
