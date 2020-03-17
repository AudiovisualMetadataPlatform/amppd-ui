<template>
  <div>
    <Header/>
    <div class="form-body">
      <h1>Reset Password</h1>
      <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="form-content" id="login">
          <div class="row"><input id="emailid" v-model="emailid" v-bind:readonly="isReadOnly" type="text" placeholder="Enter Email Address" name="emailid"> </div>
          <div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Create New Password" name="pswd"></div>
          <div class="row"><input id="cpswd" v-model="cpswd" type="password" placeholder="Confirm New Password" name="cpswd"></div>
          <div class="row"><button v-bind:disabled="isDisabled" v-on:click="reset()">Reset</button></div>
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
    isReadOnly: false,
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
      axios.post(process.env.VUE_APP_AMP_URL + '/reset-password-getEmail',
        {
          token: this.$route.params.token
        })
        .then(response => {
          this.fetch_status = response.data.success;
          this.errors = response.data.errors;
          this.emailid = response.data.emailid;
        })
        .catch(e => {
          console.log(e);
        });
        if(this.emailid.length >= 0)
          this.isReadOnly = true;
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
  margin-block-start: 100px;
  width: auto;
  height: auto;
  text-align: center;
  }

  h1 {
  text-align: center;
  }

  .form-content{
  /*padding-top:50px;*/
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 50%;
    display: inline-block;
  }

  /* Full-width inputs */
  input[type=text], input[type=password] {
    border-radius: 5px;
    padding: 15px 20px;
    margin: 20px 20px;
    border: 1px solid #ccc;
    align-content: center;
    width: 50%;
  }

  /* Set a style for all buttons */
  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
    padding: 14px 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }

  /* Add a hover effect for buttons */
  button:hover {
    opacity: 0.8;
  }

  button:disabled,
  button[disabled]{
  background-color: #6d8291;
  color: #E9972D;
  }

  .error {
    padding: 20px 100px;
    color: red;
  }

  ul{
  list-style: none;
  } 

  li span {
    width : 70%;
    padding-left: 100px;
    padding-right: 100px;
  }

  p {
    width:70%;
    text-align: center;
    margin:auto;
  }

  .row {
    text-align: center;
    padding:5px 10px;
  }

</style>