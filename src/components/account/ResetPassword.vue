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
            <h2 class="card-title">Reset Password</h2>

            <form class="needs-validation" ref="resetPasswordForm">
              <div class="mb-3" v-if="errors.other_errors.length">
                <label
                  class="form-errors"
                  v-for="error in errors.other_errors"
                  v-bind:key="error"
                  >{{ error }}</label
                >
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailid"
                  v-model="emailid"
                  placeholder="Registered Email address"
                  v-bind:readonly="isReadOnly"
                />
                <label class="invalid-feedback" v-if="errors.email_error.length">{{errors.email_error}}</label>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="pswd"
                  v-model="pswd"
                  placeholder="Create New Password"
                  v-on:focus="onClick(`pswd`)"
                />
                <label class="invalid-feedback" v-if="errors.pswd_error.length">{{errors.pswd_error}}</label>
              </div>

              <div class="mb-3">
                <label for="Password2" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="cpswd"
                  v-model="cpswd"
                  placeholder="Confirm New Password"
                  v-on:focus="onClick(`cpswd`)"
                />
                <label class="invalid-feedback" v-if="errors.cpswd_error.length">{{errors.cpswd_error}}</label>
              </div>

              <button class="btn btn-primary marg-bot-4" v-on:click="reset()">
                Save New Password
              </button>
              <p class="form-text text-muted">
                Click to <a href="#" v-on:click="loginClicked()">Sign In</a>.
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
export default {
  name: "ResetPasswordForm",
  components: {
    AmpHeader,
  },
  data() {
    return {
      errors: {
        pswd_error: "",
        cpswd_error: "",
        other_errors: [],
        errorExist: false,
      },
      reset_token: null,
      pswd: null,
      cpswd: null,
      reset_status: 0,
      fetch_status: 0,
      emailid: null,
      isReadOnly: true,
    };
  },

  created() {
    this.reset_token = this.$route.params.token;
  },
  methods: {
    async reset() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      this.errors.errorExist = false;
      if (!this.reset_token || this.reset_token.length < 6) {
        this.errors.other_errors.push("Invalid link");
      }
      if (!this.pswd) {
        this.errors.pswd_error = "(Password required)";
      } else if (this.pswd.length < 8) {
        this.errors.pswd_error = "(Password must be at least 8 characters)";
      }
      if (!this.cpswd) {
        this.errors.cpswd_error = "(Confirm Password required)";
      } else if (this.pswd && this.cpswd && this.cpswd != this.pswd) {
        this.errors.other_errors.push("Both password fields must match.");
      }
      const form = this.$refs.resetPasswordForm;
      if (!form.checkValidity()
          || this.pswd && this.cpswd && this.cpswd != this.pswd) {
        form.classList.add("was-validated");
        return;
      } else {
        console.log("entered axios if");
        await accountService
          .sendResetRequest(this.reset_token, this.pswd, this.emailid)
          .then((response) => {
            self.reset_status = response.success;
            self.errors.other_errors = response.errors;
          })
          .catch((e) => {
            console.log(e);
          });
        console.log("reset result is:" + self.reset_status);
        if (this.errors.other_errors.length == 0 && self.reset_status) {
          this.$router.push("/");
        }
        if (self.reset_status == 0) {
          this.errors.other_errors.push("Password reset was unsuccessful");
        }
      }
    },
    fetch_emailID() {
      let self = this;
      accountService
        .sendfetchEmailRequest(this.$route.params.token)
        .then((response) => {
          self.fetch_status = response.success;
          self.errors.other_errors = response.errors;
          self.emailid = response.emailid;
        })
        .catch((e) => {
          self.errors.other_errors.push("Invalid Url or Account");
          console.log(e);
        });
    },
    loginClicked() {
      this.$router.push("/");
    },
    onClick(data) {
      if (data == "pswd") this.errors.pswd_error = "";
      else this.errors.cpswd_error = "";
    },
  },
  mounted() {
    let self = this;
    self.fetch_emailID();
  },
};
</script>
