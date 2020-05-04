<template>
  <div>
    <Header/>
    <main>
      <div class="container">
        <h1 class="text-center">Welcome to the Audiovisual Metadata Platform</h1>
        <div class="card col-6">
        <div class="card-body">
        <h2 class="card-title">Sign In</h2>

        <form>
        <div class="form-group" v-if="errors.other_errors.length">
        <label class="form-errors" v-for="error in errors.other_errors" v-bind:key="error">{{error}}</label>
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
        <p class="forgot-psw form-text text-muted"><router-link :to="{ name: 'forgot-password', query: { email: email }}">Forgot Password?</router-link></p>
        </div>

        <button type="submit" class="btn btn-primary marg-bot-4" v-on:click="checkForm()">Sign In</button>
        <p class="form-text text-muted">Don't have an account? <a href="/#/register" v-on:click="registerClicked()">Sign up</a>.</p>
        </form>
        </div>
        </div>  
      </div>
  </main>
  </div>
</template>  

<script>
import Header from '@/components/shared/Header.vue';
import { accountService } from '@/service/account-service';
export default {
  name: 'LoginComponent',
  components: {
    Header
  },
  data() {
    return {
		errors: {
      email_error:'',
      pswd_error:'',
      other_errors: []
    },
    formData: new FormData(),
		email: null,
    pswd: null,
    auth_status: false
    };
  },
  methods:{
    async checkForm() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        this.errors.email_error='(Email required)';
      }
      if (!this.pswd) {
        this.errors.pswd_error='(Password required)';
      }
      if(this.errors.email_error == '' && this.errors.pswd_error == '')
      {
        var currentUser = await accountService.login(this.email, this.pswd);
        console.log(currentUser);
        console.log("AUTH:");
        if(currentUser && currentUser.token){
          if(this.$route.query.returnUrl){
            console.log("going to " + this.$route.query.returnUrl);
            this.$router.push(this.$route.query.returnUrl);
          }
          else{
            this.$router.push("/");
          }
        }
        else {
          this.errors.other_errors.push('Email and password do not match');
        }
      }
    },
    registerClicked() {
      this.$router.push('/account/register')
    },
    forgotPassword() {
      this.$router.push('/account/forgot-password')
    },
    onClick(data) {
      if(data == 'email')
        this.errors.email_error = '';
      else
        this.errors.pswd_error = '';
    }
  },
  mounted() {
    accountService.logout();
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