<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start q-gutter-lg">
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-secondary text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ this.dashboard.total_bookings }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Total Booking
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-info text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ dashboard.todays_booking }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Today's Booking
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-pink-7 text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ dashboard.active_booking }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Active Booking
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-orange-4 text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ dashboard.release_booking }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Release Booking
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-green-4 text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ dashboard.total_clients }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Total Clients
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-5 col-xs-10 col-lg-3">
        <q-card style="max-width:400px" class="my-card bg-green text-white">
          <q-item>
            <q-item-section>
              <q-avatar round>
                <q-icon size="xl" color="white" name="article" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"
                ><strong>{{ dashboard.total_parkings }}</strong>
              </q-item-label>
              <q-item-label class="text-center">
                Total Parkings
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section> </q-item-section>
          </q-item>
        </q-card>
      </div>
       <div class="col-md-10 col-sm-11 col-xs-10 col-lg-10">
        <!-- <q-toolbar>
            <q-toolbar-title>Recent entries</q-toolbar-title>
            <q-btn
              to="/applicants"
              flat
              text-color="light-blue-8"
              label="Show All"
            ></q-btn>
          </q-toolbar> -->
        <div style="display:flex">
          <div class="text-h6 text-weight-thin">Recent bookings</div>
          <q-space />
        </div>
        <q-markup-table flat bordered>
          <thead class="bg-teal">
    
            <tr style="color: #444">
              <th class="text-left">Name</th>
              <th class="text-right">Contact</th>
              <th class="text-right">Email</th>
              <th class="text-right">Address</th>
              <th class="text-right">Car type</th>
              <th class="text-right">Entry date/time</th>
              <th class="text-right">Exit date/time</th>
              <th class="text-right">Status</th>
            </tr>
          </thead>
          <tbody style="color: #555555" class="bg-grey-3">
            <tr v-for="recent in dashboard.recents" :key="recent.id">
              <td class="text-left">{{ recent.name }}</td>
              <td class="text-right">{{ recent.contact }}</td>
              <td class="text-right">{{ recent.email }}</td>
              <td class="text-right">{{ recent.address }}</td>
              <td class="text-right">{{ recent.car_type }}</td>
              <td class="text-right">{{ recent.entry_date }} {{ recent.entry_time }}</td>
              <td class="text-right">{{ recent.exit_date }} {{ recent.exit_time }}</td>
              <td :class="recent.status=='active' ? 'text-green' :'text-red' " class="text-right">{{ recent.status }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboard: {}
    };
  },
  mounted() {
    this.$axios
      .get("dashboard")
      .then(response => {
        this.dashboard = response.data;
       
      })
      .catch(error => {
        console.log("error", error.message);
      });
  }
};
</script>

<style></style>
