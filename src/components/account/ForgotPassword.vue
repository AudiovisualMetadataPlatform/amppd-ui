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
            <h2 class="card-title">Forgot Password</h2>

            <form class="needs-validation" id="forgotPwdForm">
              <div class="mb-3" v-if="errors.other_errors.length">
                <label
                  class="invalid-feedback"
                  v-for="error in errors.other_errors"
                  v-bind:key="error"
                  >{{ error }}</label
                >
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="email"
                  placeholder="Enter email address"
                  v-on:focus="onClick(`email`)"
                  required
                />
                <div class="invalid-feedback" v-if="errors.email_error.length">
                  {{ errors.email_error }}
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary mb-3"
                v-on:click="sendEmail()"
              >
                Send email
              </button>
              <p class="form-text text-muted">
                Click to <a href="/" v-on:click="loginClicked()">Sign in</a>.
              </p>

              <div class="mb-3" v-if="resend_email">
                <label class="form-label">
                  An email with a link to reset password has been sent. Please use the link as soon as possible as it will expire in a short time.
                </label>
                <span><a href="#" @click="sendEmail()">&nbsp; Resend Email</a></span>
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
  name: "ForgotPassword",
  components: {
    AmpHeader,
  },
  data() {
    return {
      errors: {
        email_error: "",
        other_errors: [],
      },
      email: null,
      auth_status: false,
      reset_token: "",
      resend_email: false,
    };
  },
  created() {
    this.email = this.$route.query.email;
  },
  computed: {
    isDisabled: function() {
      if (this.email == null || this.email == "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    async sendEmail() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        console.log("email blank");
        this.errors.email_error = "Email required.";
        // Only use validation on invalid input
        const form = document.querySelector("#forgotPwdForm");
        form.classList.add("was-validated");
      }

      if (this.errors.email_error == "") {
        await accountService
          .sendForgotPswdEmailRequest(this.email)
          .then((response) => {
            self.auth_status = response.success;
            self.errors.other_errors = response.errors;
          })
          .catch((e) => {
            console.log(e);
          });
        console.log(
          "auth status is:" +
            self.auth_status +
            " and token is:" +
            self.reset_token
        );
        if (this.errors.other_errors.length == 0 && self.auth_status) {
          this.resend_email = true;
        }
      }
    },
    loginClicked() {
      this.$router.push("/");
    },
    onClick(data) {
      // Reset form validation on focus
      const form = document.querySelector("#forgotPwdForm");
      form.classList.remove("was-validated");
      if (data == "email") this.errors.email_error = "";
    },
  },

  mounted() {
    //console.log("IT WORKS");
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
