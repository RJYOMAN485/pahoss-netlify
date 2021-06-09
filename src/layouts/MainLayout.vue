<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-btn
         v-if="roles == 'admin'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <router-link
            style="text-decoration:none;color:rgb(236 227 227)"
            to="/dashboard"
          >
            <!-- <q-btn flat @click.stop="drawer = !drawer" round dense icon="menu" /> -->
            <q-toolbar-title>
              <q-avatar>
                <img
                  src="https://seeklogo.com/images/I/indian-government-logo-1C3F1925AA-seeklogo.com.png"
                />
              </q-avatar>
              PAHOSS</q-toolbar-title
            >
          </router-link>
          <q-space/>

        <q-item  v-if="roles == 'user'" to="/mybookings" clickable>
          <q-item-section>
            <q-item-label>Bookings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item  v-if="roles == 'user'" to="/contact"  clickable>
          <q-item-section>
            <q-item-label>Contact us</q-item-label>
          </q-item-section>
        </q-item>

        <q-btn-dropdown rounded flat icon="account_circle" color="white">
          <q-list class="q-pa-sm">
            <q-item
              style="min-height: 0!important"
              to="/profile"
              clickable
              v-close-popup
            >
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item
              style="min-height: 0!important"
              to="/admin"
              clickable
              v-close-popup
            >
              <q-item-section>
                <q-item-label>Roles</q-item-label>
              </q-item-section>
            </q-item> -->

            <q-item
              style="min-height: 0!important"
              @click="logout"
              clickable
              v-close-popup
            >
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <div v-if="roles == 'admin'">
      <q-drawer
      
        style="color:#444"
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
      >
        <q-list>
          <q-item-label header class="text-grey-8">
            Essential Links
          </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-expansion-item
            expand-separator
            icon="perm_identity"
            label="Bookings"
          >
            <q-item to="/booking/today" class="q-ml-md" clickable>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Today's Booking</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/booking/active" class="q-ml-md" clickable>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Active Booking</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/bookings" class="q-ml-md" clickable>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Bookings</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable to="/feedback">
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Feedback</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";

const linksData = [
  {
    title: "Home",

    icon: "home",
    link: "/admin"
  },
  {
    title: "Parking Zones",

    icon: "directions_car",
    link: "/parking-zones"
  },
  {
    title: "Clients",
    icon: "person",
    link: "/clients"
  }
];

export default {
  beforeMount() {
    if (this.$route.fullPath == "/") this.$router.push("/dashboard");
    console.log('before mount');
  },
  created() {
    if (this.$route.fullPath == "/") this.$router.push("/dashboard");

    this.roles = this.$store.state.store.userDetails.roles;

    console.log("roles", this.roles);
  },
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      roles: ""
    };
  },
  methods: {
     ...mapActions("store", ["loginUser"]),
    logout() {
      // localStorage.removeItem("token");

      // this.loginUser('test');
      console.log(
        'yessss'
      );

      this.loginUser({});
      this.$router.push("/login/user");
    }
  }
};
</script>
