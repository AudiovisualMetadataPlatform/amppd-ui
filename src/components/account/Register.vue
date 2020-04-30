<template>
  <div>
    <Header/>
    <main>
      <div class="container">
      <h1 class="text-center">Welcome to the
      Audiovisual Metadata Platform</h1>
      <div class="card col-6">
      <div class="card-body">
      <h2 class="card-title">Register</h2>
      <form>
      <div class="form-group" v-if="errors.other_errors.length">
      <label class="form-errors" v-for="error in errors.other_errors" v-bind:key="error">{{error}}</label>
      </div>
      <div class="form-group">
      <label for="fname">First Name</label>
      <label class="form-errors" v-if="errors.fname_error.length">{{errors.fname_error}}</label>
      <input type="txt" class="form-control" id="fname" v-model="fname" placeholder="First Name" v-on:focus="onClick(`fname`)">
      </div>
      <div class="form-group">
      <label for="lname">Last Name</label>
      <input type="txt" class="form-control" id="lname" v-model="lname" placeholder="Last Name">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <label class="form-errors" v-if="errors.email_error.length">{{errors.email_error}}</label>
      <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" placeholder="Enter email address" v-on:focus="onClick(`email`)">
      </div>
      <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <label class="form-errors" v-if="errors.pswd_error.length">{{errors.pswd_error}}</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="pswd" placeholder="Password" v-on:focus="onClick(`pswd`)">
      </div>
      <div class="form-group">
      <label for="exampleInputPassword2">Confirm Password</label>
      <label class="form-errors" v-if="errors.cpswd_error.length">{{errors.cpswd_error}}</label>
      <input type="password" class="form-control" id="exampleInputPassword2" v-model="confirm_pswd" placeholder="Confirm Password" v-on:focus="onClick(`cpswd`)">
      </div>
      <button type="submit" class="btn btn-primary marg-bot-4" v-on:click="validateRegisterForm()">Sign Up</button>
      <p class="form-text text-muted">Already have an account? <a href="/" v-on:click="login()">Sign In</a>.</p>
      </form>
      </div>
      </div>  
      </div>
    </main>
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue';
import {sendRegisterRequest} from '@/service/account-service';
  export default {
    name: 'RegisterComponent',
    components: {
      Header
      },
    data: function() {
      return {
      errors: {
        fname_error:'',
        cpswd_error:'',
        email_error:'',
        pswd_error:'',
        other_errors: [],
        errorExist: false
      },
      fname: null,
      lname: null,
      pswd: null,
      email: null,
      confirm_pswd: null,
      register_status: 0
    }
  },
  methods:{
    async validateRegisterForm() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      this.errors.errorExist = false;
      if (!this.fname) {
        this.errors.fname_error='(First Name required)';
        this.errors.errorExist=true;
      }
      else if(this.fname.length < 3){
        this.errors.fname_error='(Name must be atleast 3 characters)';
        this.errors.errorExist=true;
      }

      if (!this.email) {
        this.errors.email_error='(Email required)';
        this.errors.errorExist=true;
      }
      else if (!this.validateEmail(this.email)) {
        this.errors.email_error='(Invalid Email)';
        this.errors.errorExist=true;
      }
      if (!this.pswd) {
        this.errors.pswd_error='(Password required)';
        this.errors.errorExist=true;
      }
      else if(this.pswd.length < 8){
        this.errors.pswd_error = '(Password must be at least 8 characters)';
        this.errors.errorExist=true;
      }
      if (!this.confirm_pswd) {
        this.errors.cpswd_error='(Confirm Password required)';
        this.errors.errorExist=true;
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.other_errors.push('Passwords do not match');
        this.errors.errorExist=true;
      }
      if (this.errors.other_errors.length == 0 && !this.errorExist) 
      {
        await sendRegisterRequest(this.fname+this.lname, this.pswd, this.email)
        .then(response => {
          self.register_status = response.success;
          self.errors.other_errors = response.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("register result is:"+self.register_status);
        if(self.register_status)
        {
          alert("Successfully registered. Please wait for an account approval email before you can login.")
          this.$router.push("/");
        }
      }
    },
    validateEmail(email){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;// eslint-disable-line
      return re.test(email);
    },
    login(){
      this.$router.push("/");
    },
    onClick(data) {
      if(data == 'fname')
        this.errors.fname_error = '';
      else if(data == 'email')
        this.errors.email_error = '';
      else if(data == 'pswd')
        this.errors.pswd_error = '';
      else
        this.errors.cpswd_error = '';
    }
  },
  mounted() {
    //console.log("IT WORKS");
  }
};
</script>

<style lang="css">
@import '/amppd-ui/src/styles/style.css';
  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem; 
    padding-left:3px; 
  }

</style>