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
          <q-btn @click="deleteUser()" label="Confirm" color="red-5" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-markup-table flat bordered>
      <thead class="bg-teal">
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <div class="text-h5 q-ml-md text-white">Clients</div>
            </div>
          </th>
        </tr>
        <tr style="color: #444">
          <th class="text-left">Name</th>
          <th class="text-right">Contact</th>
          <th class="text-right">Email</th>
          <th class="text-right">Gender</th>
          <th class="text-right">Car type</th>
          <th class="text-right">Address</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody style="color: #555555" class="bg-grey-3">
        <tr v-for="formData in formDatas" :key="formData.email">
          <td class="text-left">{{ formData.name }}</td>
          <td class="text-right">{{ formData.contact }}</td>
          <td class="text-right">{{ formData.email }}</td>
          <th class="text-right">{{ formData.gender }}</th>
          <td class="text-right">{{ formData.car_type }}</td>
          <td class="text-right">{{ formData.address }}</td>
          <td class="text-right">
            <q-btn
              size="sm"
              round
              flat
              class="bg-grey-3 customBtn"
              color="red-3"
              @click="showConfrim(formData.id)"
              icon="delete"
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
    this.getClients();
  },
  data() {
    return {
      edit: false,
      formDatas: [],
      confirm: false,
      del:{
        id: null
      }
    };
  },
  methods: {
    getClients() {
      this.$axios
        .get("clients")
        .then(response => {
          this.formDatas = response.data;
        })
        .catch(error => {
          console.log("error", error.message);
        });
    },
    showConfrim(id) {
      this.del.id = id;
      this.confirm = true
    },
    deleteUser() {
     
      this.$axios
        .post("user/delete", this.del)
        .then(response => {
          this.getClients();
        })
        .catch(error => {
          console.log("error", error.message);
          this.$q.notify({
            message: error.message,
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        });
    }
  }
};
</script>

<style></style>
