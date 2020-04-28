<template>
  <div class="main-body">
    <Header/>
    <div class="form-body">
      <h1>Welcome to the Audiovisual Metadata Platform</h1>
      <div class="form-content" id="login">
        <h2>Sign In</h2>
        <form>
          <div class="form-group" v-if="errors.other_errors.length">
            <label class="form-errors" v-for="error in errors.other_errors" v-bind:key="error">{{error}}</label>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <label class="form-errors" v-if="errors.email_error.length">{{errors.email_error}}</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email address" v-on:click="onClick(`email`)">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <label class="form-errors" v-if="errors.pswd_error.length">{{errors.pswd_error}}</label>
            <input type="password" class="form-control" id="pswd" v-model="pswd" placeholder="Password" v-on:click="onClick(`pswd`)">
            <p class="forgot-psw form-text text-muted"><router-link :to="{ name: 'forgot-password', query: { email: email }}">Forgot Password?</router-link></p>
          </div>
          
          <button class="btn btn-primary marg-bot-4" v-on:click="checkForm()">Sign In</button>
          <p class="form-text text-muted">Don't have an account? <a href="#" v-on:click="registerClicked()" class="active-link">Sign Up</a>.</p>
        </form>
        </div>  
  </div>
  </div>
</template>  

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
import {authenticationService} from '@/service/authentication-service.js';
export default {
  name: 'LoginComponent',
  components: {
    Header,
  },
  data() {
    return {
		errors: {
      email_error:'',
      pswd_error:'',
      other_errors: []
    },
		email: null,
    pswd: null,
    auth_status: false,
    return_url: null
    };
  },
  methods:{
    async checkForm() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        this.errors.email_error='Email required.';
      }
      if (!this.pswd) {
        this.errors.pswd_error='Password required.';
      }
      if(this.errors.email_error == '' && this.errors.pswd_error == '')
      {
        var currentUser = await authenticationService.login(this.email, this.pswd);
        console.log(currentUser);
        if(currentUser && currentUser.token){
          if(this.$route.query.returnUrl){
            this.$router.push(this.$route.query.returnUrl);
          }
          else{
            this.$router.push("/welcome");
          }
        }
        else {
          this.errors.other_errors.push('Email and password do not match');
        }
      }
    },
    registerClicked() {
      this.$router.push('/register')
    },
    forgotPassword() {
      this.$router.push('/forgot-password')
    },
    onClick(data) {
      if(data == 'email')
        this.errors.email_error = '';
      else
        this.errors.pswd_error = '';
    }
  },
  mounted() {
    //console.log("IT WORKS");
  }
};
</script>


<style scoped>

 .form-body{
  max-width: 960px;
  height: auto;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 9em;
  margin-bottom: 2em;
  font-size: 1rem;
  text-align: left;
  line-height: 1.5;
  }

  .forgot-psw {
    font-size: 0.9rem;
    margin-top: 0!important;

  }

  h1 {
  text-align: center!important;
  font-size: 2.5rem;
  margin-bottom: .5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: #000;

  }

  h2 {
    margin-bottom: .50rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: #000;
  }

  btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}

.btn-primary {
    background: #F4871E;
    border-color: #F4871E;
    color: #153c4d;
}

.marg-bot-4 {
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

  .form-content{
    margin-top: 2.5rem;
    margin-right: auto;
    margin-bottom: 2.5rem;
    margin-left: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    flex: 0 0 50%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 60%;
    width: 100%;
    min-height: 1px;
    padding-right: 25px;
    padding-left: 25px;
    text-align: left;
  }

  .text-muted {
    color: #6c757d!important;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
    cursor: default;
    width: 100%;
  }

.form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

button, input {
    overflow: visible;
    margin: 0;
    font-family: inherit;
    
}
button:hover {
    color: #F4871E;
    background-color: #153c4d;
  }

.active-link {
  color: #153c4d;
}

.active-link:hover {
  color: #F4871E;
}

input {
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  cursor: text;
  font: 400 13.3333px Arial;
}

  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem;
  }
 
  p {
    width:70%;
    text-align: left;
    margin-bottom: 1rem;
    /* margin:auto; */
  }

  *, ::after, ::before {
    box-sizing: border-box;
}

 .main-body {
  background: #fff;
  height: 100%;
  min-height: 100%;
  margin: 0;
  background-color: #fff;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #404040;
  text-align: left;
  display: block;
 }
  
</style>