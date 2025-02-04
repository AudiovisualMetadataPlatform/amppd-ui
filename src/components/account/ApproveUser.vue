<template>
  <div class="col-12">
    <!-- <AmpHeader/> -->
    <main>
      <div class="container">
        <h1 class="text-center">Welcome to the Audiovisual Metadata Platform</h1>
        <div class="card col-6">
        <div class="card-body">
        <h2 class="card-title">Approve User</h2>
        <form>
          <div class="error">
            <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
            </ul>
            </p>
          </div>
          <div class="mb-3">
            <label for="userId" class="form-label">User ID: {{this.$route.params.id}}</label>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email: {{approve_user_emailId}}</label>
          </div>
          <div class="mb-3" v-if="isUserApproved">
            <label class="form-label">The user has already been approved. </label>
          </div>
          <div class="mb-3" v-if="isRequested" >
            <button class="btn btn-primary marg-bot-4" v-on:click="approveUser()" :disabled="disableAction">Approve</button>
          </div>
          <div class="mb-3" v-if="isRequested">
            <button class="btn btn-primary marg-bot-4" v-on:click="rejectUser()" :disabled="disableAction">Reject</button>
          </div>
          <div class="mb-3" v-if="approve_user">
            <label class="form-label">The user has been approved. </label>
          </div>
          <div class="mb-3" v-if="reject_user">
            <label class="form-label">The user has been rejected successfully. </label>
          </div>
        </form>
      </div>  
    </div>
  </div>
  </main>
  </div>
</template>  

<script>
import AmpHeader from "@/components/shared/AmpHeader.vue";
import { accountService } from "@/service/account-service";
export default {
  name: "ApproveUser",
  components: {
    AmpHeader,
  },
  data: function () {
    return {
      errors: [],
      id: null,
      approve_user: false,
      reject_user: false,
      approve_user_emailId: null,
      approve_user_status: null,
      disableAction: false,
    };
  },
  computed: {
    isRequested: function () {
      return this.approve_user_status == "REQUESTED";
    },
    isUserApproved: function () {
      return (
        this.approve_user_status == "ACTIVATED" ||
        this.approve_user_status == "ACCEPTED"
      );
    },
  },
  methods: {
    async approveUser() {
      event.preventDefault();
      let self = this;
      this.errors = [];
      self.approve_user = false;
      self.reject_user = false;
      self.disableAction = true;
      await accountService
        .sendApproveUserRequest(this.$route.params.id, true)
        .then((response) => {
          self.approve_user = response.success;
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("approve result is:" + self.approve_user);
      if (this.errors.length != 0) {
        this.errors.push("User was not approved");
      }
    },

    async loadUser() {
      event.preventDefault();
      let self = this;
      await accountService
        .getUser(this.$route.params.id)
        .then((response) => {
          self.approve_user_emailId = response.email;
          self.approve_user_status = response.status;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async rejectUser() {
      event.preventDefault();
      let self = this;
      this.errors = [];
      self.approve_user = false;
      self.reject_user = false;
      self.disableAction = true;
      await accountService
        .sendApproveUserRequest(this.$route.params.id, false)
        .then((response) => {
          self.reject_user = response.success;
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("reject result is:" + self.reject_user);
      if (this.errors.length != 0) {
        this.errors.push("User was not rejected successfully");
      }
    },
  },
  beforeMount() {
    this.loadUser();
  },
};
</script>

