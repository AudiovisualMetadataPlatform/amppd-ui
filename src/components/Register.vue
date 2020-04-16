<template>
  <div class="main-body">
    <Header/>
    <div class="form-body">
      <h1>Welcome to the Audiovisual Metadata Platform</h1>
      <div class="form-content" id="login">
        <h2>Register</h2>
        <form>
          <div class="form-group" v-if="errors.other_errors.length">
            <label class="form-errors" v-for="error in errors.other_errors" v-bind:key="error">{{error}}</label>
          </div>
          <div class="form-group">
            <label for="fname">First Name</label>
            <label class="form-errors" v-if="errors.fname_error.length">{{errors.fname_error}}</label>
            <input type="txt" class="form-control" id="fname" v-model="fname" placeholder="First Name" v-on:click="onClick(`fname`)">
          </div>
          <div class="form-group">
            <label for="lname">Last Name</label>
            <input type="txt" class="form-control" id="lname" v-model="lname" placeholder="Last Name">
          </div>
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <label class="form-errors" v-if="errors.email_error.length">{{errors.email_error}}</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email address" v-on:click="onClick(`email`)">
          </div>
          <div class="form-group">
            <label for="Password1">Password</label>
            <label class="form-errors" v-if="errors.pswd_error.length">{{errors.pswd_error}}</label>
            <input type="password" class="form-control" id="pswd" v-model="pswd" placeholder="Password" v-on:click="onClick(`pswd`)">
          </div>
          <div class="form-group">
            <label for="Password2">Confirm Password</label>
            <label class="form-errors" v-if="errors.cpswd_error.length">{{errors.cpswd_error}}</label>
            <input type="password" class="form-control" id="cpswd" v-model="confirm_pswd" placeholder="Confirm Password" v-on:click="onClick(`cpswd`)">
          </div>
          <button type="submit" class="btn btn-primary marg-bot-4" v-on:click="validateRegisterForm()">Sign Up</button>
          <p class="form-text text-muted">Already have an account? <a href="#" v-on:click="login()" class="active-link">Sign In</a>.</p>
        </form>
      </div>  
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
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
      if (!this.fname) {
        this.errors.fname_error='Email required.';
        this.errorExist=true;
      }
      else if(this.fname.length < 3){
        this.errors.fname_error='Name must be atleast 3 characters';
        this.errorExist=true;
      }
      if (!this.validateEmail(this.email)) {
        this.errors.email_error='Invalid Email.';
        this.errorExist=true;
      }
      if (!this.pswd) {
        this.errors.pswd_error='Password required.';
        this.errorExist=true;
      }
      else if(this.pswd.length < 8){
        this.errors.pswd_error = 'Password must be at least 8 characters';
        this.errorExist=true;
      }
      if (!this.confirm_pswd) {
        this.errors.cpswd_error='Confirm Password required.';
        this.errorExist=true;
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.other_errors.push('Passwords do not match.');
        this.errorExist=true;
      }
      if (this.errors.other_errors.length == 0 && !this.errorExist) 
      {
        await axios.post(process.env.VUE_APP_AMP_URL + '/register',
        {
          username: this.fname+this.lname,
          password: this.pswd,
          email: this.email  
        })
        .then(response => {
          self.register_status = response.data.success;
          self.errors.other_errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("register result is:"+self.register_status);
        if(self.register_status)
        {
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
    margin-top: 1rem;
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
    margin:0;
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












