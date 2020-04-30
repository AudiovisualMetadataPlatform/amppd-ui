<template>
  <div>
    <Header/>
    <main>
      <div class="container">
        <h1 class="text-center">Welcome to the Audiovisual Metadata Platform</h1>
        <div class="card col-6">
        <div class="card-body">
        <h2 class="card-title">Forgot Password</h2>

        <form>
        <div class="form-group" v-if="errors.other_errors.length">
        <label class="form-errors" v-for="error in errors.other_errors" v-bind:key="error">{{error}}</label>
        </div>

        <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <label class="form-errors" v-if="errors.email_error.length">{{errors.email_error}}</label>
        <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" placeholder="Enter email address" v-on:focus="onClick(`email`)">
        </div>
        
        <button type="submit" class="btn btn-primary marg-bot-4" v-on:click="sendEmail()">Send email</button>
        <p class="form-text text-muted">Click to <a href="/" v-on:click="loginClicked()">Sign in</a>.</p>

        <div class="form-group" v-if="resend_email">        
        <label>An email has been sent. </label>
        <span><a href="#" @click="sendEmail()">Resend Email?</a></span>
        </div>          
        </form>

        </div>  
        </div>
      </div>
    </main>
    </div>
</template>  

<script>
import Header from '@/components/shared/Header.vue';
import {sendForgotPswdEmailRequest} from '@/service/account-service';
export default {
  name: 'ForgotPassword',
  components: {
    Header
  },
  data() {
    return {
    errors: {
      email_error:'',
      other_errors: []
    }, 
    email:null,
    auth_status: false,
    reset_token: '',
    resend_email: false,
    };
  },
  created() {
    this.email = this.$route.query.email;
  },
  computed:{
    isDisabled: function(){
      if(this.email==null || this.email=='')
      {
          return true;
      }
      return false;
    }
  },
  methods:{
    async sendEmail() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        console.log("email blank");
        this.errors.email_error='Email required.';
      }
      
      if(this.errors.email_error == '')
      {
        await sendForgotPswdEmailRequest(this.email)
        .then(response => {
          self.auth_status = response.success;
          self.errors.other_errors = response.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("auth status is:"+self.auth_status+" and token is:"+self.reset_token);
        if(this.errors.other_errors.length == 0 && self.auth_status)
        {
          this.resend_email = true;
        }
      }
    },
    loginClicked() {
      this.$router.push('/')
    },
    onClick(data) {
      if(data == 'email')
        this.errors.email_error = '';
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