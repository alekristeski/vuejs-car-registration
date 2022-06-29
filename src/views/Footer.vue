<template>
  <v-footer
    padless
    class="d-flex align-content-end flex-wrap w-50 mx-auto mt-10"
  >
    <v-card class="flex" flat tile>
      <v-card-title
        class="teal flex-footer"
        style="display: flex !important justify-content: centar"
      >
        <strong class="font-weight-medium white--text"
          >Get connected with us on social networks!</strong
        >
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-6"
          dark
          color="dark"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Aleksandar</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { mdiLinkedin, mdiEmail } from "@mdi/js";
export default {
  data: () => ({
    icons: {
      mdiLinkedin,
      mdiEmail,
    },
  }),
};
</script>
<style scoped>
.v-card__title {
  padding: 0px;
}
.v-btn--icon {
  color: #42b983 !important;
}
.flex-footer {
  display: flex !important;
  justify-content: center !important;
}
</style>
