<template>
  <div class="main-body">
    <Header/>
    <div class="form-body">
      <h1>Welcome to the Audiovisual Metadata Platform</h1>
      <div class="form-content" id="login">
        <h2>Reset Password</h2>
        <form>
          <div class="form-group" v-if="errors.length">
            <label class="form-errors" v-for="error in errors" v-bind:key="error">{{error}}</label>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="emailid" v-model="emailid" placeholder="Registered Email address" v-bind:readonly="isReadOnly" name="emailid">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="pswd" v-model="pswd" placeholder="Create New Password" name="pswd">
          </div>
          <div class="form-group">
            <label for="Password2">Confirm Password</label>
            <input type="password" class="form-control" id="cpswd" v-model="cpswd" placeholder="Confirm New Password" name="cpswd">
          </div>
          <!-- <router-link :to="{ name: 'forgot-password', query: { email: email }}">Forgot Password?</router-link> -->
          <button class="btn btn-primary marg-bot-4" v-on:click="reset()" v-bind:disabled="isDisabled">Save New Password</button>
          <p class="form-text text-muted">Click to <a href="#" v-on:click="loginClicked()" class="active-link">Sign In</a>.</p>
        </form>
        </div>  
  </div>
  </div>
</template>  

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
export default {
  name: 'ResetPasswordForm',
  components: {
    Header,
  },
  data() {
    return {
		errors: [],
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
  computed:{
    isDisabled: function(){
      if(this.emailid==null || this.emailid=='' || this.pswd==null || this.pswd=='' || this.cpswd=='' || this.cpswd==null)
      {
          return true;
      }
      return false;
    }
  },
  methods:{
    async reset() {
      event.preventDefault();
      let self = this;
      this.errors = [];

      if (!this.reset_token || this.reset_token.length < 6) {
        this.errors.push('Invalid link');     
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }
      else if(this.pswd.length < 8){
        this.errors.push('Password must be at least 8 characters');
      }
      if (!this.cpswd) {
        this.errors.push('Confirm Password required.'); 
      }
      if (this.pswd && this.cpswd && this.cpswd != this.pswd) {
        this.errors.push('Both password fields must match.');
      }
      if (this.errors.length == 0)
      {   
        await axios.post(process.env.VUE_APP_AMP_URL + '/reset-password',
        {
          emailid: this.emailid,
          password: this.pswd,
          token: this.$route.params.token
        })
        .then(response => {
          self.reset_status = response.data.success;
          self.errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("reset result is:"+self.reset_status);
        if(this.errors.length == 0 && self.reset_status)
        {
          this.$router.push("/welcome");
        }
        if(self.reset_status == 0)
        {
          this.errors.push('Password reset was unsuccessful');
        }
      }
    },
    fetch_emailID() {
      let self = this;
      axios.post(process.env.VUE_APP_AMP_URL + '/reset-password-getEmail',
        {
          token: self.$route.params.token
        })
        .then(response => {
          self.fetch_status = response.data.success;
          self.errors = response.data.errors;
          self.emailid = response.data.emailid;
        })
        .catch(e => {
          self.errors.push("Invalid Url or Account")
          console.log(e);
        });
        /* if(self.emailid != null)
        {
          this.isReadOnly = true;
          console.log("isReadOnly : "+this.isReadOnly);
        } */
    },
    loginClicked() {
      this.$router.push('/')
    }
  },
  mounted(){
    //this.reset_token = this.$route.params.token;
    let self = this;
    self.fetch_emailID();
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

  button:disabled,
  button[disabled]{
  background-color: #6d8291;
  color: #E9972D;
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
button:hover:enabled {
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

  /* ul{
  list-style: none;
  } 

  li span {
    width : 70%;
    padding-left: 100px;
    padding-right: 100px;
  } */
 
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