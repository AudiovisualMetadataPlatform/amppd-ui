<template>
  <div class="col-12">
    <!-- <AmpHeader/> -->
    <main>
      <div class="container">
        <h1 class="text-center">
          Welcome to the Audiovisual Metadata Platform
        </h1>
        <div class="card col-6">
          <div class="card-body">
            <h2 class="card-title">Sign In</h2>

            <form>
              <div class="form-group" v-if="errors.other_errors.length">
                <label
                  class="form-errors"
                  v-for="error in errors.other_errors"
                  v-bind:key="error"
                  >{{ error }}</label
                >
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <label class="form-errors" v-if="errors.email_error.length">{{
                  errors.email_error
                }}</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="email"
                  placeholder="Enter email address"
                  v-on:focus="onClick(`email`)"
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <label class="form-errors" v-if="errors.pswd_error.length">{{
                  errors.pswd_error
                }}</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="pswd"
                  placeholder="Password"
                  v-on:focus="onClick(`pswd`)"
                />
                <p class="forgot-psw form-text text-muted">
                  <router-link
                    :to="{ name: 'forgot-password', query: { email: email } }"
                    >Forgot Password?</router-link
                  >
                </p>
              </div>

              <button
                type="submit"
                class="btn btn-primary marg-bot-4"
                v-on:click="checkForm()"
              >
                Sign In
              </button>
              <p class="form-text text-muted">
                Don't have an account?
                <a href="#" v-on:click="registerClicked()">Sign up</a>.
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
import { sync } from "vuex-pathify";
import AccessControlService from "@/service/access-control-service";
import SharedService from "@/service/shared-service";

export default {
  name: "LoginComponent",
  components: {
    AmpHeader,
  },
  data() {
    return {
      errors: {
        email_error: "",
        pswd_error: "",
        other_errors: [],
      },
      formData: new FormData(),
      email: null,
      pswd: null,
      auth_status: false,
      activate_status: false,
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

  created() {
    if (this.$route.params.token) {
      console.log("The token is:" + this.$route.params.token);
      this.token = this.$route.params.token;
      this.activateNewUser();
      console.log("activation result is:" + this.activate_status);
    }
  },
  methods: {
    activateNewUser() {
      let self = this;
      accountService
        .sendActivateUserRequest(this.token)
        .then((response) => {
          self.activate_status = response.success;
          self.errors.other_errors = response.errors;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async checkForm() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        this.errors.email_error = "(Email required)";
      }
      if (!this.pswd) {
        this.errors.pswd_error = "(Password required)";
      }
      if (this.errors.email_error == "" && this.errors.pswd_error == "") {
        var currentUser = await accountService.login(this.email, this.pswd);
        console.log("current user:" + currentUser);
        console.log("AUTH:");
        if (currentUser && currentUser.token) {
          self.isAuthenticated = true;
          await self.accessControlService.initPermissions(this);
          // Force setting localStorage vuex object for state in vuex-persistedstate
          let vuex = JSON.parse(localStorage.getItem("vuex"));
          localStorage.setItem("vuex", JSON.stringify({
            ...vuex,
            acUnitsActions: this.acUnitsActions,
            acUnitsMedia: this.acUnitsMedia,
            acUnitsOutput: this.acUnitsOutput,
            acActions: this.acActions,
          }));
          if (this.$route.query.returnUrl) {
            console.log("going to " + this.$route.query.returnUrl);
            this.$router.push(this.$route.query.returnUrl);
          } else {
            this.$router.push("/");
          }
        } else {
          this.errors.other_errors.push("Email and password do not match");
        }
      }
    },
    registerClicked() {
      this.$router.push("/account/register");
    },
    forgotPassword() {
      this.$router.push("/account/forgot-password");
    },
    onClick(data) {
      if (data == "email") this.errors.email_error = "";
      else this.errors.pswd_error = "";
    },
  },
  mounted() {
    accountService.logout();
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
.form-errors {
  color: red;
  margin: 0% !important;
  font-size: 0.9rem;
  padding-left: 3px;
}
</style>
