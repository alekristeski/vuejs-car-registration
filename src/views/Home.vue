<template>
  <v-sheet>
    <v-form ref="form" v-model="valid" lazy-validation data-app>
      <v-row
        class="mt-10"
        style="display: flex !important; justify-content: center"
      >
        <v-col cols="8" sm="6" md="6" lg="4">
          <v-card>
            <v-card-text>
              <v-row class="mt-4">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="carName"
                    label="Vehicle name"
                    required
                    maxlength="50"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="carType"
                    label="Vehicle type"
                    :items="typeItems"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="mt-4">
                <v-col cols="6">
                  <v-autocomplete
                    v-model="carModel"
                    :items="items"
                    label="Model"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    placeholder="e.g. XX-NNNN-XX"
                    label="Licence plate number"
                    v-model="licencePlate"
                    required
                    :rules="[rules.licence]"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-4">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="myDate"
                    label="Last registration date"
                    required
                    type="date"
                    :rules="[rules.myDate]"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="dateReg"
                    label="Date of registration submission"
                    required
                    type="date"
                    :rules="[rules.dateReg]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }" class="button">
                  <v-btn
                    :disabled="!valid"
                    color="primart"
                    class="mr-4 success-button mt-4 d-flex justify-center"
                    @click="validate"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Submit
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Check your form:
                  </v-card-title>

                  <v-card-text class="dialogRez">
                    <h6>
                      Vehicle name:
                      <strong> {{ carName }} </strong>
                    </h6>
                    <h6>
                      Vehicle type:
                      <strong> {{ carType }} </strong>
                    </h6>
                    <h6>
                      Model: <strong> {{ carModel }} </strong>
                    </h6>
                    <h6>
                      Licence plate number:
                      <strong> {{ licencePlate }} </strong>
                    </h6>
                    <h6>
                      Last registration date:
                      <strong> {{ myDate }} </strong>
                    </h6>
                    <h6>
                      Date of registration submission:
                      <strong> {{ dateReg }} </strong>
                    </h6>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn
                      color="success"
                      dark
                      elevation="2"
                      @click="submitDialog"
                      id="acceptBtn"
                    >
                      Accept
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn class="mr-4 mt-4 mb-8 w-100" @click="redirect">
              Redirect
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
    <Footer />
  </v-sheet>
</template>
<script>
import moment from "moment";
import Footer from "@/views/Footer";
import vehicles from "./vehicles.json";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      vehiclesData: vehicles,
      dialog: false,
      valid: false,
      carName: "",
      carType: "",
      licencePlate: "",
      myDate: moment().add(-1, "days").format("YYYY-MM-DD"),
      dateReg: moment().format("YYYY-MM-DD"),
      typeItems: ["Car", "Van", "Truck", "Container", "Trailer", "Dupmer"],
      carModel: "",
      items: [
        "Audi",
        "BMW",
        "Citroen",
        "Honda",
        "Hyndai",
        "Mercedes",
        "Nissan",
        "Opel",
        "Suzuki",
        "Toyota",
        "Volkswagen",
      ],

      rules: {
        licence: (value) => {
          const testLicence = /^(([a-zA-Z]?){2}[-](\d){4}[-]([a-zA-Z]){2})/;
          return testLicence.test(value) || "Invalid Licence";
        },
        myDate: (value) => {
          const todaysDate = moment();
          return (
            moment(value).isBefore(todaysDate, "days") ||
            "Should not choose date bigger than today.  "
          );
        },

        dateReg: (value) => {
          return (
            moment(value).isAfter(this.myDate) ||
            "Should not be earlier than the Last registration date."
          );
        },
      },
    };
  },
  mounted() {
    this.valid = false;
  },
  watch: {},
  methods: {
    licenceRules(e) {
      console.log(1111, { e });
    },
    setModel(e) {
      console.log({ e });
    },
    handleSubmit() {
      console.log("Form Submitted");
    },
    submitDialog() {
      this.dialog = false;
      this.$router.push({ name: "About" });
    },
    validate() {
      this.valid = this.$refs.form.validate();
      // vehicles.map((vehicle) => {
      //   console.log(vehicle);
      // });
      let item = {
        vehicleName: this.carName,
        vehicleType: this.carType,
        plateNumber: this.licencePlate,
        model: this.carModel,
      };
      console.log(item);
      // fetch("./vehicles.json")
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
    },
    redirect() {
      this.$router.push("/about");
    },
  },
};
</script>
