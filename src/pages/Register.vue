<template>
  <div
    style="min-height:100vh;"
    class="row q-pa-md flex flex-center justify-center items-center q-gutter-md custombg"
  >
    <q-card
      class="my-card q-pa-md col"
      style="max-width: 600px;border: 3px solid #26A69A;"
    >
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6 text-center">User Registration</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <q-input
            v-model="formData.name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            color="purple-12"
            label="Name"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="formData.email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            color="purple-12"
            label="Email"
            type="email"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="formData.contact"
            :rules="[
              val =>
                (val && val.length == 10) || 'Mobile number must be 10 digit'
            ]"
            color="purple-12"
            label="Mobile no"
            type="number"
          >
            <template v-slot:prepend>
              <q-icon name="call" />
            </template>
          </q-input>

          <q-input
            v-model="formData.car_type"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            color="purple-12"
            label="Car type"
          >
            <template v-slot:prepend>
              <q-icon name="directions_car" />
            </template>
          </q-input>

          <div style="display:flex">
            <div class="q-mr-sm">Sex</div>
            <q-radio
              dense
              required
              v-model="formData.gender"
              color="secondary"
              val="male"
              label="Male"
            />
            <q-radio
              class="q-ml-sm"
              dense
              required
              v-model="formData.gender"
              color="secondary"
              val="female"
              label="Female"
            />
          </div>

          <q-input
            v-model="formData.address"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            color="purple-12"
            label="Address"
          >
            <template v-slot:prepend>
              <q-icon name="home" />
            </template>
          </q-input>

          <q-input
            v-model="formData.password"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            color="purple-12"
            label="Password"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-input
            v-model="formData.confirmPassword"
            :rules="[
              val =>
                this.formData.password == this.formData.confirmPassword ||
                'Password do not match'
            ]"
            color="purple-12"
            label="Confirm Password"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-btn
            label="Register"
            :loading="loading"
            class="full-width"
            type="submit"
            color="secondary"
          />
        </q-form>

        <div class="text-green q-mt-md" style="max-width:430px;display:flex">
          <small class=""
            ><q-icon name="info" size="xs" />Already have an account ?
            <q-btn
              size="xs"
              to="/login/user"
              flat
              color="blue"
              dense
              label="Login"
            />
             here
          </small>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      age: null,
      loading: false,

      accept: false,

      errors: [],

      loading : false,

      formData: {
        name: "",
        email: "",
        password: "",
        contact: "",
        address: "",
        car_type: "",
        confirmPassword: "",
        roles: "user",
        gender: ""
      },
      error: {}
    };
  },

  methods: {
    async submitForm() {
      this.loading = true;
      console.log("submitted");

      // return;

      localStorage.removeItem("token");
      // this.loginUser(this.formData)
      this.$axios.defaults.withCredentials = true;

      await this.$axios
        .post("storeuser", this.formData)
        .then(response => {
           this.loading = false;
          this.$q.notify({
            message: "Register Successful",
            color: "green",
            position: "top",
            icon: "thumb_up"
          });

          this.$router.push("/login/user");
        })
        .catch(err => {
           this.loading = false;
          console.log("error message:", err.message);
          this.$q.notify({
            message: "Invalid login credentials",
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        });
    }
  }
};
</script>

<style lang="sass" scoped>

.custombg
  // background: linear-gradient(rgba(255,255,255,.5), rgba(200,240,240,.5)),url(../assets/mining.jpg)
  // background: url(../assets/mining.jpg)
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  // background: #6190E8 /* fallback for old browsers */
  // background: -webkit-linear-gradient(to top, #A7BFE8, #6190E8)  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to top, #A7BFE8, #6190E8) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

</style>
