<template>
  <div class="q-pa-md">
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="secondary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            @click="onDelete()"
            label="Confirm"
            color="red-5"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit">
      <q-card style="min-width:300px;max-width:600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Update Parking</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-form @submit.prevent="onUpdate" class="q-gutter-md q-pa-lg">
          <q-input
            color="secondary"
            dense
            v-model="editParking.pname"
            label="Name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            color="secondary"
            dense
            label="Latitude"
            v-model="editParking.lat"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            color="secondary"
            dense
            label="Longitude"
            lazy-rules
            v-model="editParking.lng"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
          </q-input>

          <q-input
            color="secondary"
            dense
            label="Available Space"
            v-model="editParking.available_space"
            :rules="[val => (val && val.length > 0) || 'Maximum 10 digits']"
          />

          <q-select
            dense
            label="Available Time"
            v-model="editParking.available_time"
            lazy-rules
            :options="options"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            flat
          >
          </q-select>

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
      
    </q-dialog>

    <div class="text-right q-mb-md">
        <q-btn
          to="/parking/new"
          dense
          icon="add"
          color="green"
          label="New Parking"
        />
      </div>

    <q-markup-table flat bordered>
      <thead class="bg-grey">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <div class="text-h5 q-ml-md text-white">Parking Zones</div>
             
            </div>
          </th>
        </tr>
        <tr style="color: #444">
          <th class="text-left">Name</th>
          <th class="text-center">Latitude</th>
          <th class="text-center">Longitude</th>
          <th class="text-center">Available Space</th>
          <th class="text-center">Available Time</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody style="color: #555555" class="bg-grey-3">
        <tr v-for="parking in parkings" :key="parking.id">
          <td class="text-left">{{ parking.pname }}</td>
          <td class="text-center">{{ parking.lat }}</td>
          <td class="text-center">{{ parking.lng }}</td>
          <td class="text-center">{{ parking.available_space }}</td>
          <td class="text-center">{{ parking.available_time }}</td>

          <td class="text-right">
            <q-btn
              size="sm"
              round
              flat
              class="bg-grey-3 customBtn"
              color="green"
              icon="edit"
              @click="setEdit(parking)"
            />
            <q-btn
              size="sm"
              round
              flat
              class="bg-grey-3 customBtn"
              color="red-5"
              icon="delete"
              @click="setDelete(parking.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getParking();
  },
  data() {
    return {
      edit: false,
      confirm: false,
      parkings: [],
      editParking: {},
      deleteId: null,
      options: ["Morning", "Morning-Afternoon", "Afternoon", "Night"]
    };
  },
  methods: {
    editDialog() {
      this.edit = true;
    },
    getParking() {
      this.$axios
        .get("parking-zones")
        .then(response => {
          this.parkings = response.data;
        })
        .catch(error => {
          console.log("error", error.message);
        });
    },
    setEdit(parking) {
      Object.assign(this.editParking, parking);
      console.log("parking", parking);
      this.edit = true;
      // this.editParking = parking;
      // console.log(this.editParking);
    },
    setDelete(id) {
      this.deleteId = id;
      this.confirm = true;
    },
    onDelete() {
      let formData = {
        id: this.deleteId
      };
      console.log("delete");
      this.$axios
        .post("delete-parking", formData)
        .then(response => {
          this.getParking();
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            color: "red-4",
            position: "top",
            icon: "warning"
          });
          console.log("error", error.message);
        });
    },
    onUpdate() {
      this.$axios
        .post("update-parking", this.editParking)
        .then(response => {
          // this.parkings = response.data;
          this.$q.notify({
            message: "Updated Successful",
            color: "green",
            position: "top",
            icon: "thumb_up"
          });
          this.getParking();
          this.edit = false;
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            color: "red-4",
            position: "top",
            icon: "warning"
          });
          console.log("error", error.message);
          this.edit = false;
        });
    }
  }
};
</script>

<style></style>
