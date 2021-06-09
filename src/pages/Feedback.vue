<template>
  <div class="row q-pa-md q-col-gutter-sm justify-start">
    <div v-for="feedback in feedbacks" :key="feedback.message" class="col-md-4 col-sm-4 col-xs-6 col-lg-3">
      <q-card  class="my-card bg-grey-2 text-weight-light">
        <q-card-section class="text-right ">
          <div class="text-subtitle2 text-caption">-{{ feedback.name }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none ">
         {{ feedback.message }}
        </q-card-section>
      </q-card>
    </div>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbacks: []
    }
  },
  mounted() {
    this.getFeedbacks();
  },
  methods: {
    getFeedbacks() {
      this.$axios
        .get("feedbacks", this.formData)
        .then(response => {
          
          this.feedbacks = response.data
        })
        .catch(error => {
          console.log(error.message);
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
