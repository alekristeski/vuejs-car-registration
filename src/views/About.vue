<template>
  <v-sheet data-app>
    <Breadcrumb :items="items" :button="button" />
    <v-container fluid class="mt-4">
      <v-data-table
        :headers="headers"
        :items="vehiclesData"
        sort-by="velicleName"
        class="elevation-1 mx-4"
        :search="filter"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.vehicleName"
                          label="Vehicle name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.vehicleType"
                          label="Vehicle Type"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.model"
                          label="Vehicle Model"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.plateNumber"
                          label="Plate Number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon small @click="editItem(item)" left>
            {{ icons.mdiPencil }}
          </v-icon>

          <v-icon small @click="deleteItem(item)" left>
            {{ icons.mdiDelete }}
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <Footer />
  </v-sheet>
</template>

<script>
import vehicles from "./vehicles.json";
import { mdiPencil, mdiDelete, mdiMagnify, mdiPlus } from "@mdi/js";
import Footer from "@/views/Footer";
import Breadcrumb from "@/views/Breadcrumb";

export default {
  components: {
    Footer,
    Breadcrumb,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    vehiclesData: vehicles,
    filter: "",
    icons: {
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      mdiPlus,
    },
    editedIndex: -1,
    editedItem: {
      vehicleName: "",
      vehicleType: 0,
      model: 0,
      plateNumber: 0,
    },
    defaultItem: {
      vehicleName: "",
      vehicleType: 0,
      model: 0,
      plateNumber: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
        {
          text: "Vehicle name",
          align: "start",
          sortable: false,
          value: "vehicleName",
        },
        { text: "Vehicle type", value: "vehicleType" },
        { text: "Model", value: "model" },
        { text: "License plate number", value: "plateNumber" },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },
    items() {
      return [
        { text: "home", link: "/Home" },
        { text: "Home" },
        { text: "About" },
      ];
    },
    button() {
      return {
        icon: this.icons.mdiPlus,
        title: "Add item",
        action: () => this.addDriver(),
      };
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.vehiclesData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.vehiclesData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.vehiclesData.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.vehiclesData[this.editedIndex], this.editedItem);
      }
      this.close();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.v-data-table-header,
.v-data-footer {
  background-color: #eceff1;
}
</style>
