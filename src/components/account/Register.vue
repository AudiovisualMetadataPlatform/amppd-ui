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
            <h2 class="card-title">Register</h2>
            <form class="needs-validation" id="registerUserForm">
              <div class="mb-3" v-if="errors.other_errors.length">
                <label
                  class="form-errors"
                  v-for="error in errors.other_errors"
                  v-bind:key="error"
                  >{{ error }}</label
                >
              </div>
              <div class="mb-3">
                <label for="fname" class="form-label">First Name</label>
                <input
                  type="txt"
                  class="form-control"
                  id="fname"
                  v-model="fname"
                  placeholder="First Name"
                  v-on:focus="onClick(`fname`)"
                  required
                />
                <label class="invalid-feedback" v-if="errors.fname_error.length">{{errors.fname_error}}</label>
              </div>
              <div class="mb-3">
                <label for="lname" class="form-label">Last Name</label>
                <input
                  type="txt"
                  class="form-control"
                  id="lname"
                  v-model="lname"
                  placeholder="Last Name"
                  v-on:focus="onClick(`fname`)"
                  required
                />
                <label class="invalid-feedback" v-if="errors.lname_error.length">{{errors.lname_error}}</label>
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
                <label class="invalid-feedback" v-if="errors.email_error.length">{{errors.email_error}}</label>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="pswd"
                  placeholder="Password"
                  v-on:focus="onClick(`pswd`)"
                  required
                />
                <label class="invalid-feedback" v-if="errors.pswd_error.length">{{errors.pswd_error}}</label>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  v-model="confirm_pswd"
                  placeholder="Confirm Password"
                  v-on:focus="onClick(`cpswd`)"
                  required
                />
                <label class="invalid-feedback" v-if="errors.cpswd_error.length">{{errors.cpswd_error}}</label>
              </div>
              <button
                type="submit"
                class="btn btn-primary marg-bot-4"
                v-on:click="validateRegisterForm()"
              >
                Sign Up
              </button>
              <p class="form-text text-muted">
                Already have an account?
                <a href="/" v-on:click="login()">Sign In</a>.
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
  name: "RegisterComponent",
  components: {
    AmpHeader,
  },
  data: function() {
    return {
      errors: {
        fname_error: "",
        lname_error: "",
        cpswd_error: "",
        email_error: "",
        pswd_error: "",
        other_errors: [],
        errorExist: false,
      },
      fname: null,
      lname: null,
      pswd: null,
      email: null,
      confirm_pswd: null,
      register_status: 0,
    };
  },
  methods: {
    async validateRegisterForm() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      this.errors.errorExist = false;
      if (!this.fname) {
        this.errors.fname_error = "(First Name required)";
      } else if (this.fname.length < 2) {
        this.errors.fname_error = "(Name must be atleast 2 characters)";
      }
      if (!this.lname) {
        this.errors.lname_error = "(Last Name required)";
      } else if (this.lname.length < 2) {
        this.errors.lname_error = "(Last name must be atleast 2 characters)";
      }
      if (!this.email) {
        this.errors.email_error = "(Email required)";
      } else if (!this.validateEmail(this.email)) {
        this.errors.email_error = "(Invalid Email)";
      }
      if (!this.pswd) {
        this.errors.pswd_error = "(Password required)";
      } else if (this.pswd.length < 8) {
        this.errors.pswd_error = "(Password must be at least 8 characters)";
      }
      if (!this.confirm_pswd) {
        this.errors.cpswd_error = "(Confirm Password required)";
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.other_errors.push("Passwords do not match");
      }
      const form = document.querySelector("#registerUserForm");
      if (!form.checkValidity()
          || this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        form.classList.add("was-validated");
        return;
      } else {
        await accountService
          .sendRegisterRequest(
            this.email,
            this.fname,
            this.lname,
            this.pswd,
            this.email
          )
          .then((response) => {
            self.register_status = response.success;
            self.errors.other_errors = response.errors;
          })
          .catch((e) => {
            console.log(e);
          });
        console.log("register result is:" + self.register_status);
        if (self.register_status) {
          alert(
            "Successfully registered. Please wait for an account approval email before you can login."
          );
          this.$router.push("/");
        }
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(email);
    },
    login() {
      this.$router.push("/");
    },
    onClick(data) {
      // Reset form validation on focus
      const form = document.querySelector("#registerUserForm");
      form.classList.contains("was-validated") && form.classList.remove("was-validated");
      // Reset error message(s) on focus
      if (data == "fname") this.errors.fname_error = "";
      else if (data == "lname") this.errors.lname_error = "";
      else if (data == "email") this.errors.email_error = "";
      else if (data == "pswd") this.errors.pswd_error = "";
      else this.errors.cpswd_error = "";
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
