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

            <form class="needs-validation" ref="forgotPasswordForm">
              <div class="mb-3" v-if="other_errors.length">
                <label
                  class="alert alert-danger" role="alert"
                  v-for="error in other_errors"
                  v-bind:key="error"
                  >{{ error }}
                </label>                
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
                <div class="invalid-feedback" v-if="email_error.length">
                  {{ email_error }}
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
      email_error: "",
      other_errors: [],
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
      self.resend_email = false;
      self.other_errors = [];

      if (!this.email || !this.email.includes("@")) {
        console.log("Email address blank or invalid");
        this.email_error = "Valid email address required.";
        // Only use validation on invalid input
        const form = self.$refs.forgotPasswordForm;
        form.classList.add("was-validated");
      }

      if (this.email_error == "") {
        await accountService
          .sendForgotPswdEmailRequest(this.email)
          .then((response) => {
            self.auth_status = response.success;
            self.other_errors = response.errors;
          })
          .catch((e) => {
            console.log("Error while sending sendForgotPswdEmailRequest", e);
          });
        if (this.other_errors.length == 0 && self.auth_status) {
          this.resend_email = true;
          console.log("Forgot password emali sent successfully.");
        }
        else {
          console.log("sendForgotPswdEmailRequest response error: " + self.other_errors[0]);
        }
      }
    },
    loginClicked() {
      this.$router.push("/");
    },
    onClick(data) {
      // Reset form validation on focus
      const form = this.$refs.forgotPasswordForm;
      form.classList.remove("was-validated");
      if (data == "email") this.email_error = "";
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
