<template>
  <div
    style="min-height:100vh;"
    class="row flex flex-center q-gutter-md custombg"
  >
    <q-card
      class="my-card q-pa-md col"
      style="max-width: 600px;border: 3px solid #26A69A;"
    >
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6 text-center">Admin Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <q-input
            v-model="formData.email"
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
            :rules="[val => (val && val.length > 0) || 'Please type something']"
            type="password"
            color="purple-12"
            label="Password"
            v-model="formData.password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <!-- <div> -->
          <q-btn
            label="Login"
            class="full-width"
            type="submit"
            :loading="loading"
            color="secondary"
          />
          <!-- </div> -->
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  mounted() {
    this.getUser();
    this.$axios.defaults.withCredentials = true;
    this.$axios
      .get("user", this.formData)
      .then(response => {
        // return console.log(response.data);
        console.log("auth", response.data);
      })
      .catch(error => {
        console.log("unauthorised", error.message);
      });
  },
  data() {
    return {
      name: null,
      age: null,
      loading: false,

      accept: false,

      errors: [],

      formData: {
        email: "admim@pahoss.com",
        password: "password",
        roles: "admin"
      },
      error: {}
    };
  },

  methods: {
    ...mapActions("store", ["loginUser"]),

    getUser() {
      console.log("userDetails", this.$store.state.store.userDetails);
    },
    async submitForm() {
      let userDetails = {
        name: "dummy",
        email: "rj@gmail.com",
        roles: "admin"
      };

      // return;
      this.$axios.defaults.withCredentials = true;
      this.loading = true;
      // console.log("submitted");

      // localStorage.removeItem("token");
      // this.loginUser(this.formData)

      await this.$axios;
      // .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      // .then(response => {
      //   console.log(response);
      this.$axios
        .post("https://pahoss.herokuapp.com/login", this.formData)
        .then(response => {
          console.log('admin correct');
          this.loading = false;
          this.loginUser(response.data);

          console.log("redirect to validate");
          this.$router.push("/admin");

          // return console.log(response.data);
          console.log(response.data);
        })
        .catch(error => {
          this.loading = false;
          this.$q.notify({
            message: "Invalid login credentials",
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        });
      // });
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
.my-card
</style>
