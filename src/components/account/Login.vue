<template>
  <div class="col-12">
    <loader :show="loading" />
    <!-- <AmpHeader/> -->
    <main>
      <div class="container">
        <h1 class="text-center">
          Welcome to the Audiovisual Metadata Platform
        </h1>
        <div class="card col-6">
          <div class="card-body">
            <h2 class="card-title">Sign In</h2>
            <form class="needs-validation" ref="loginUserForm">
              <div class="mb-3" v-if="errors.other_errors.length">
                <label
                  class="form-errors"
                  v-for="error in errors.other_errors"
                  v-bind:key="error"
                  >{{ error }}</label
                >
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="email"
                  placeholder="Enter email address"
                  v-on:focus="onClick()"
                  required
                />
                <label class="invalid-feedback" v-if="errors.email_error.length">{{ errors.email_error }}</label>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="pswd"
                  placeholder="Password"
                  v-on:focus="onClick()"
                  required
                />
                <label class="invalid-feedback" v-if="errors.pswd_error.length">{{ errors.pswd_error }}</label>
              </div>
              <p class="forgot-psw form-text text-muted">
                <router-link
                  :to="{ name: 'forgot-password', query: { email: email } }"
                >
                  Forgot Password?
                </router-link>
              </p>
              <button type="submit" class="btn btn-primary mb-4" v-on:click="checkForm($event)">
                Sign In
              </button>
              <p class="form-text text-muted">
                Don't have an account?
                <a href="#" @click.prevent="registerClicked()">Sign up</a>.
              </p>
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
import sync from "@/helpers/sync";
import AccessControlService from "@/service/access-control-service";
import SharedService from "@/service/shared-service";
import Loader from "@/components/shared/Loader.vue";

export default {
  name: "LoginComponent",
  components: {
    AmpHeader,
    Loader
  },
  data() {
    return {
      errors: {
        email_error: "",
        pswd_error: "",
        other_errors: [],
      },
      email: null,
      pswd: null,
      auth_status: false,
      activate_status: false,
      loading: false,
      id: null,
      token: null,
      accessControlService: new AccessControlService(),
      sharedService: new SharedService(),
    };
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
    accessControl: sync("accessControl"),
    acIsAdmin: sync("acIsAdmin"),
    acUnitsActions: sync("acUnitsActions"),
    acUnitsMedia: sync("acUnitsMedia"),
    acUnitsOutput: sync("acUnitsOutput"),
    acActions: sync("acActions"),
  },

  async created() {
    if (this.$route.params.token) {
      console.log("The token is:" + this.$route.params.token);
      this.token = this.$route.params.token;
      this.loading = true;
      await this.activateNewUser();
      this.loading = false;
      console.log("activation status: " + this.activate_status);
      console.log("activation errors: " + this.errors.other_errors);
    }
  },
  methods: {
    async activateNewUser() {
      let self = this;
      try {
        let response = await accountService.sendActivateUserRequest(this.token);
        self.activate_status = response.success;
        if (self.activate_status) 
          self.errors.other_errors[0] = "Your account has been successfully activated. You may now login.";
        else 
          self.errors.other_errors = response.errors;
      }
      catch(e) {
          console.log(e);
      }
    },
    async checkForm(event) {
      event.preventDefault();
      let self = this;
      self.errors.other_errors = [];
      const form = self.$refs.loginUserForm;
      if (!self.email) {
        self.errors.email_error = "(Email required)";
      }
      if (!self.pswd) {
        self.errors.pswd_error = "(Password required)";
      }
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      } else {
        var currentUser = await accountService.login(self.email, self.pswd);
        console.log("Login.checkForm: Current user: ", currentUser);
        if(currentUser === null) {
          self.errors.other_errors.push("Email and password do not match");
          return;
        } else if (currentUser?.token) {
          self.isAuthenticated = true;
          await self.accessControlService.initPermissions(self);
          console.log("Login.checkForm: acActions: " + self.acActions);
          // Force setting localStorage vuex object for state in vuex-persistedstate
          let vuex = JSON.parse(localStorage.getItem("vuex"));
          localStorage.setItem("vuex", JSON.stringify({
            ...vuex,
            acUnitsActions: self.acUnitsActions,
            acUnitsMedia: self.acUnitsMedia,
            acUnitsOutput: self.acUnitsOutput,
            acActions: self.acActions,
          }));
          console.log("Login.checkForm: set AC data in vuex to local storage");
          if (self.$route.query.returnUrl) {
            console.log("Login.checkForm: routing to returnUrl: " + self.$route.query.returnUrl);
            self.$router.push(self.$route.query.returnUrl);
          } else {
            console.log("Login.checkForm: routing to home: " + self.$route.query.returnUrl);
            self.$router.push("/");
          }
        }
      }
    },
    registerClicked() {
      this.$router.push("/account/register");
    },
    forgotPassword() {
      this.$router.push("/account/forgot-password");
    },
    onClick() {
      // Reset form validation on focus
      const form = this.$refs.loginUserForm;
      form.classList.contains("was-validated") && form.classList.remove("was-validated");
      // Reset error messages
      this.errors.email_error = "";
      this.errors.pswd_error = "";
    },
  },
  mounted() {
    accountService.logout();
  },
};
</script>

<style scoped>
@import "../../styles/style.css";
a {
  color: #153c4d !important;
  text-decoration: none !important;
  &:hover {
    color: #f4871e !important;
  }
}
</style>
