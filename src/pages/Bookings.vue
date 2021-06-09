<template>
  <div class="q-pa-md">
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="secondary" text-color="white" />
          <span class="q-ml-sm">Are you sure? Cancel booking</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            label="Confirm"
            @click="cancel()"
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

        <q-form class="q-gutter-md q-pa-lg">
          <q-input
            color="secondary"
            dense
            label="Name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
          </q-input>

          <q-input
            color="secondary"
            dense
            label="Latitude"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
          </q-input>

          <q-input
            color="secondary"
            dense
            label="Longitude"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
          </q-input>

          <q-input
            color="secondary"
            dense
            label="Available Time"
            :rules="[val => (val && val.length == 10) || 'Maximum 10 digits']"
          >
          </q-input>

          <q-select
            dense
            outlined
            label="Available Space"
            lazy-rules
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
    <q-markup-table flat bordered>
      <thead class="bg-teal">
        <tr>
          <th colspan="10">
            <div class="row no-wrap items-center">
              <div class="text-h5 text-white">All Bookings</div>
            </div>
          </th>
        </tr>
        <tr style="color: #444">
          <th class="text-left">Name</th>
           <th class="text-left">Book id</th>
          <th class="text-left">Parking Name</th>
          <th class="text-right">Entry date & time</th>
          <th class="text-right">Exit date & time</th>

          <th class="text-right">Amount</th>
          <th class="text-right">Status</th>

          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody style="color: #555555" class="bg-grey-3">
        <tr v-for="booking in bookings" :key="booking.id">
          <td class="text-left">{{ booking.name }}</td>
           <td class="text-left">{{ booking.id }}</td>
          <td class="text-left">{{ booking.pname }}</td>
          <td class="text-right">
            {{ booking.entry_date }} {{ booking.entry_time }}
          </td>
          <td class="text-right">
            {{ booking.exit_date }} {{ booking.exit_time }}
          </td>
          <td class="text-right">{{ booking.amount }}</td>
          <td :class="booking.status=='active' ? 'text-green' :'text-red' " class="text-right">{{ booking.status }}</td>

          <td class="text-right">
            <q-btn
             :disable="booking.status !== 'active'"
              size="sm"
              round
              flat
              class="bg-grey-3 customBtn"
              color="red-3"
              :icon="booking.status=='active' ? 'close' : 'block'"
              @click="setCancelId(booking.id)"
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
    this.$axios
      .get("bookings")
      .then(response => {
        this.bookings = response.data;
       
      })
      .catch(error => {
        console.log("error", error.message);
      });
  },
  data() {
    return {
      edit: false,
      confirm: false,
      bookings: [],
      cancelId: null
    };
  },
  methods: {
    cancel() {
      console.log("cancel");
      // return;
      let formData = {
        id: this.cancelId
      };

      this.$axios
        .post("cancel", formData)
        .then(response => {
          this.getBookings();
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

    getBookings() {
      this.$axios
        .get("booking/today")
        .then(response => {
          this.bookings = response.data;
          console.log(this.bookings);
        })
        .catch(error => {
          console.log("error", error.message);
        });
    },
    setCancelId(id) {
      this.cancelId = id;
      this.confirm = true;
      // let formData = {
      //   id: id
      // };
      // this.$axios
      //   .post("cancel", formData)
      //   .then(response => {
      //     this.bookings = response.data;
      //     console.log(this.bookings);
      //   })
      //   .catch(error => {
      //     console.log("error", error.message);
      //   });
    }
  }
};
</script>

<style></style>
