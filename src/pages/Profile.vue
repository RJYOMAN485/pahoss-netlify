<template>
  <div
    style="max-width: 90rem;margin:0 auto"
    class="q-pa-md items-center justify-center q-gutter-md"
  >
    <div style="position: relative;" class="text-h5">Update Profile</div>
    <q-card class="q-pa-md" flat bordered>
      <q-card-section horizontal>
        <div class="gt-xs col-4 text-center text-caption q-mt-lg">
          <q-avatar
            size="100px"
            font-size="52px"
            color="grey-6"
            text-color="white"
            icon="account_circle"
          />

          <div class="q-mt-lg text-h5">
            {{ user.name }}
          </div>

          <div class="text-subtitle1">
            {{ user.email }}
          </div>
        </div>

        <!-- <q-seperator /> -->
        <q-card-section class="col">
          <q-form
            @click.stop=""
            @submit.prevent="onSubmit()"
            class="q-gutter-md q-pa-md"
          >
            <div class="row q-pa-lg q-col-gutter-md justify-center">
              <div class="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                <label for="">Name</label>
                <q-input
                  v-model="user.name"
                  rounded
                  outlined
                  dense
                  color="purple-12"
                  placeholder="Name"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please type something'
                  ]"
                >
                </q-input>
                <label for="">Password</label>
                <q-input
                  v-model="user.password"
                  rounded
                  color="purple-12"
                  dense
                  outlined
                  placeholder="Password"
                >
                </q-input>
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                <label for="">Email</label>
                <q-input
                  v-model="user.email"
                  type="email"
                  rounded
                  outlined
                  color="purple-12"
                  dense
                  placeholder="Email"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please type something'
                  ]"
                >
                </q-input>
                <label for="">Confirm Password</label>
                <q-input
                  v-model="user.password_confirmation"
                  rounded
                  outlined
                  color="purple-12"
                  dense
                  placeholder="Confirm Password"
                >
                </q-input>
              </div>

              <div class="col-md-6 col-sm-8 col-xs-12 col-lg-5">
                <small class="text-red" v-if="error">{{ error }}</small
                ><br />
                <small>leave it blank to keep the same</small><br />
                <q-btn
                  class="q-mt-md"
                  type="submit"
                  rounded
                  outline
                  style="color: #26A69A;;"
                  label="Update"
                  icon="done"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  mounted() {
    // this.user = this.$store.state.store.userDetails;
    let target = {};

    this.user = Object.assign(target, this.$store.state.store.userDetails);
  

  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },

      error: ""
    };
  },

  methods: {
    ...mapActions("store", ["loginUser"]),
    onSubmit() {
      if (
        (this.user.password || this.user.password_confirmation) &&
        this.user.password !== this.user.password_confirmation
      ) {
        this.error = "Password do not match";
        return;
      }
      this.error = "";
      this.$axios
        .post('user/update', this.user)
        .then(response => {
           this.loginUser(this.user);
          console.log(response.data);
          this.$q.notify({
            message: "Profile updated successfully",
            color: "green-4",
            position: "top",
            icon: "thumb_up"
          });
         
        })
        .catch(err => {
          console.log(err.message);
          this.edit = false;
          this.$q.notify({
            message: err.message,
            color: "red-4",
            position: "top",
            icon: "warning"
          });
        });
    }
  }
};
</script>
