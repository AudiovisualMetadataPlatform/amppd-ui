<template>
  <div class="container access-denied">
    <h1>{{ heading }}</h1>
    <div v-if="currentUser != undefined">
      <p>{{ unauthorized }}</p>
    </div>
    <div v-else>
      <p>{{ signedout }}</p>
      <button
        type="submit"
        class="btn btn-primary marg-bot-4"
        v-on:click="routeToSignIn()"
      >
        Sign In
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccessDenied",
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
      heading: "Restricted Content",
      signedout: "Your're not signed in. You may be able to view this page after sigining in.",
      unauthorized: "You are not authorized to access this content."
    }
  },
  methods: {
    routeToSignIn() {
      this.$router.push(
        { 
          path: '/account/login', 
          query: { returnUrl: this.$route.query.returnUrl }
        }
      );
    }
  },
  mounted() {},
};
</script>

<style scoped>
.access-denied {
  padding: 3rem 0;
}
</style>
