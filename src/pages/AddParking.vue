<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg ">
      <div class="col-sm-6 col-lg-6 col-xs-12">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Add Parking</div>
            <q-space />
          </q-card-section>

          <q-form @submit.prevent="onSubmit" class="q-gutter-md q-pa-lg">
            <div class="q-ml-sm row q-col-gutter-md">
              <div class="col-sm-6 col-xs-12">
                <q-input
                  v-model="formData.location"
                  dense
                  color="secondary"
                  label="Name"
                  :rules="[
                    val => (val && val.length > 0) || 'Please type something'
                  ]"
                />
              </div>
              <div class="col-sm-6 col-xs-12">
                <q-input
                  v-model="formData.postal"
                  dense
                  color="secondary"
                  label="Postal"
                  :rules="[
                    val => (val && val.length == 6) || 'Length should be six'
                  ]"
                />
              </div>
            </div>

            <div class="q-ml-sm row q-col-gutter-md">
              <div class="col-sm-6 col-xs-12">
                <q-input
                  dense
                  v-model="formData.lat"
                  color="secondary"
                  label="Latitude"
                  :rules="[val => (val && val > 0) || 'Please type something']"
                >
                </q-input>
              </div>
              <div class="col-sm-6 col-xs-12">
                <q-input
                  v-model="formData.lng"
                  dense
                  color="secondary"
                  label="Longitude"
                  :rules="[val => (val && val > 0) || 'Please type something']"
                >
                </q-input>
              </div>
            </div>

            <q-input
              v-model="formData.available_space"
              dense
              type="number"
              color="secondary"
              label="Available space"
              :rules="[val => (val && val > 0) || 'Please type something']"
            >
            </q-input>

            <q-select
              v-model="formData.available_time"
              :options="options"
              label="Available time"
              required
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <div>
              <q-btn
                :loading="loading"
                label="Add"
                class="full-width"
                type="submit"
                color="secondary"
              />
            </div>
          </q-form>
        </q-card>
      </div>
      <div class="col-6 col-sm-6 col-lg-6 col-xs-12">
        <!-- <p>Selected Position: {{ marker.position }}</p>
        <p>Location: {{ location }}</p> -->
        <q-card>
          <q-card-section>
            <small
              >Click on the map to set a marker. (Location tracked
              automatically.)</small
            >
          </q-card-section>
          <gmap-map
            :center="center"
            :zoom="16"
            map-style-id="roadmap"
            style="width: 100%; height: 50vmin"
            ref="mapRef"
            @click="handleMapClick"
          >
            <gmap-marker
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"
            />
          </gmap-map>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  computed: {
    google: gmapApi
  },
  data() {
    return {
      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },

      mapOptions: {
        disableDefaultUI: true
      },

      formData: {
        location: "",
        lat: "null",
        lng: "null",
        postal: "",
        available_space: 6,
        available_time: null
      },
      loading: false,

      options: ["Morning", "Morning-Afternoon", "Afternoon", "Night"]
    };
  },
  mounted() {
    this.geolocate();

    // this.panToMarker();
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$axios.defaults.withCredentials = true;
      console.log("submitted");

      this.$axios;
      // .get("http://pahoss.herokuapp.com/sanctum/csrf-cookie")
      // .then(response => {
      this.$axios
        .post("storeparking", this.formData)
        .then(response => {
          this.loading = false;
          console.log(response.data);
          this.$q.notify({
            message: "Added Successful",
            color: "green",
            position: "top",
            icon: "thumb_up"
          });

          this.$router.push("/parking-zones");
        })
        .catch(error => {
          this.loading = false;
          console.log(error.message);
          this.$q.notify({
            message: error.message,
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        });
      // });
    },
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.marker.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.getCityAndCountry();

          this.panToMarker();
        },
        () => {
          this.$q.notify({
            message: "Location access denied. Enable location to add slot",
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        }
      );
    },

    async getCityAndCountry() {
      this.formData.lat = this.marker.position.lat;
      this.formData.lng = this.marker.position.lng;

      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

      // https://maps.googleapis.com/maps/api/geocode/json?latlng=23.724265253426005,92.72666931152344&key=AIzaSyDDXkzEIj9sB3J_ohqT0woVWqAJQiyRmAE



       let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.marker.position.lat},${this.marker.position.lng}&key=AIzaSyDDXkzEIj9sB3J_ohqT0woVWqAJQiyRmAE`;
      this.$axios.defaults.withCredentials = false;

       await this.$axios
        .get(apiUrl)
        .then(result => {
          console.log('results',result.data.results[0].address_components);
          this.formData.location = result.data.results[0].address_components[1].long_name +', ' + result.data.results[0].address_components[2].short_name ;
          this.formData.postal = result.data.results[0].address_components[6].long_name;
          // this.postal = result.data.postal
        })
        .catch(err => {
          console.log(err);
        });



      // let apiUrl = `https://geocode.xyz/${this.marker.position.lat},${this.marker.position.lng} ?json=1`;
      // this.$axios.defaults.withCredentials = false;

      // await this.$axios
      //   .get(apiUrl)
      //   .then(result => {
      //     this.formData.location = result.data.city + "," + result.data.region;
      //     // this.postal = result.data.postal
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      // this.$refs.mapRef.setZoom(18);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      // console.log('before lat',e);
      this.getCityAndCountry();
    }
  }
};
</script>

<style></style>
