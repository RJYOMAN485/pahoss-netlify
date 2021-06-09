<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg ">
      <div class="col-6 col-lg-6 col-xs-12">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Update Parking</div>
            <q-space />
          </q-card-section>

          <q-form class="q-gutter-md q-pa-lg">
            <q-input v-model="location" dense color="secondary" label="Name">
            </q-input>

            <div style="display:flex">
              <q-input dense v-model="lat" color="secondary" label="Latitude">
              </q-input>
              <q-input
                v-model="lng"
                class="q-ml-sm"
                dense
                color="secondary"
                label="Longitude"
              >
              </q-input>
            </div>

            <q-input
              dense
              type="number"
              color="secondary"
              label="Available space"
            >
            </q-input>

            <q-select
              v-model="model"
              :options="options"
              label="Available time"
            />
            <div>
              <q-btn
                label="Update"
                class="full-width"
                type="submit"
                color="secondary"
              />
            </div>
          </q-form>
        </q-card>
      </div>
      <div class="col-6 col-lg-6 col-xs-12">
        <!-- <p>Selected Position: {{ marker.position }}</p>
        <p>Location: {{ location }}</p> -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
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
      location: "",
      lat: "",
      lng: "",

      model: null,
      options: ["Morning", "Morning-Afternoon", "Night"]
    };
  },
  mounted() {
    this.geolocate();

    // this.panToMarker();
  },
  methods: {
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.getCityAndCountry();

        this.panToMarker();
      });
    },

    getCityAndCountry() {
      this.lat = this.marker.position.lat;
      this.lng = this.marker.position.lng;
      console.log(this.marker.position.lat);
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

      let apiUrl = `http://geocode.xyz/${this.marker.position.lat},${this.marker.position.lng} ?json=1`;
      this.$axios.defaults.withCredentials = false;

      this.$axios
        .get(apiUrl)
        .then(result => {
          console.log("address", result.data);
          this.location = result.data.city + "," + result.data.region;
        })
        .catch(err => {
          console.log(err);
        });
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
      console.log(e);
      this.getCityAndCountry();
    }
  }
};
</script>

<style></style>
