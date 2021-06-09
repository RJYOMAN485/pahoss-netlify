import store from "../store/store";
import axios from "axios";
const APP_URL = "https://127.0.0.1:8000/api/";

axios.defaults.withCredentials = true;

console.log("cheeck storage");

// localStorage.setItem('vuex','this is vuex')



// console.log("store value", roles);

// if (email) {
//   if (roles == "user") next();
//   else
//     next({
//       path: "/admin"
//     });
// } else {
//   next({
//     path: "/login/user"
//   });
// }

// beforeEnter: (to, form, next) => {

//   console.log('getters dash APP_URl'+store.state.userDetails.name);
//   next()

// }
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/Dashboard.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            console.log("dash routes");
            if (roles == "user") next();
            else
              next({
                path: "/admin"
              });
          } else {
            console.log("dash fail routes", email);
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/feedback",
        component: () => import("src/pages/Feedback.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },
      {
        path: "/profile",
        component: () => import("pages/Profile.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            next();
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/clients",
        component: () => import("pages/Clients.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },
      {
        path: "/parking-zones",
        component: () => import("pages/Parking.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },
      {
        path: "/admin",
        component: () => import("pages/Admin.vue"),
        meta: { requireGuest: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/parking/edit/:id",
        component: () => import("src/pages/EditParking.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },
      {
        path: "/parking/new",
        component: () => import("src/pages/AddParking.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/booking/today",
        component: () => import("src/pages/TodayBookings.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/booking/active",
        component: () => import("src/pages/ActiveBookings.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/bookings/",
        component: () => import("src/pages/Bookings.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "admin") next();
            else
              next({
                path: "/dashboard"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/mybookings/",
        component: () => import("src/pages/MyBookings.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "user") next();
            else
              next({
                path: "/admin"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      },

      {
        path: "/contact/",
        component: () => import("src/pages/Contact.vue"),
        meta: { authRequired: true },
        beforeEnter: (to, form, next) => {
          var user = "";
          var email = "";
          var roles = "";

          if (localStorage.getItem("vuex")) {
            user = JSON.parse(localStorage.getItem("vuex"));
            email = user.store.userDetails.email;

            roles = user.store.userDetails.roles;
          } else {
            user = "";
            email = "";

            roles = "";
          }

          if (email) {
            if (roles == "user") next();
            else
              next({
                path: "/admin"
              });
          } else {
            next({
              path: "/login/user"
            });
          }
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },
  {
    path: "/register",
    component: () => import("pages/Register.vue"),
    meta: { requireGuest: true },
    beforeEnter: (to, form, next) => {
      var user = "";
      var email = "";
      var roles = "";

      if (localStorage.getItem("vuex")) {
        user = JSON.parse(localStorage.getItem("vuex"));
        email = user.store.userDetails.email;

        roles = user.store.userDetails.roles;
      } else {
        user = "";
        email = "";

        roles = "";
      }

      if (email) {
        next({
          path: "/dashboard"
        });
      } else {
        next();
      }
    }
  },
  {
    path: "/login/user",
    component: () => import("pages/Login.vue"),
    meta: { requireGuest: true },
    beforeEnter: (to, form, next) => {
      var user = "";
      var email = "";
      var roles = "";

      if (localStorage.getItem("vuex")) {
        user = JSON.parse(localStorage.getItem("vuex"));
        email = user.store.userDetails.email;

        roles = user.store.userDetails.roles;
      } else {
        user = "";
        email = "";

        roles = "";
      }

      console.log("store value login", email);

      if (email) {
        next("/admin");
      } else {
        next();
      }
    }
  },

  {
    path: "/login/admin",
    component: () => import("pages/AdminLogin.vue"),
    meta: { requireGuest: true },
    beforeEnter: (to, form, next) => {
      var user = "";
      var email = "";
      var roles = "";

      if (localStorage.getItem("vuex")) {
        user = JSON.parse(localStorage.getItem("vuex"));
        email = user.store.userDetails.email;

        roles = user.store.userDetails.roles;
      } else {
        user = "";
        email = "";

        roles = "";
      }

      if (email) {
        next("/admin");
      } else {
        next();
      }
    }
  }
];

export default routes;
