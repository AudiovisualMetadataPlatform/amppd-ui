<template>
  <div >

    <Header/>
	<div class="form-body">
        <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="form-content" id="login">
            <div class="row"><input id="token" v-model="token" type="text" placeholder="Enter reset token here" name="token"> </div>
            <div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Create New Password" name="pswd"></div> 
			<div class="row"><input id="cpswd" v-model="cpswd" type="password" placeholder="Confirm New Password" name="cpswd"></div>
            <div class="row"><button v-on:click="reset()">Reset</button></div>
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
		reset_token: 123456,
		pswd: null,
		cpswd: null,
		reset_status: 0,
		email: null
    };
  },
  methods:{
    async reset() {
      event.preventDefault();
      let self = this;
      this.errors = [];
      if (!this.reset_token) {
        this.errors.push('reset_token required.');
      }
      if (this.reset_token.length < 6) {
        this.errors.push('Invalid reset_token ');
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }
      else if(this.pswd.length < 8){
        this.errors.push('Password must be at least 8 characters');
      }
      if (!this.confirm_pswd) {
        this.errors.push('Confirm Password required.');
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.push('Passwords do not match.');
      }
      if (this.errors.length == 0)
      {
        await axios.post(process.env.VUE_APP_AMP_URL + '/reset-password',
        {
          email: this.email,
          password: this.pswd,
          token: this.token
        })
        .then(response => {
          self.reset_status = response.data.success;
          self.errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("reset result is:"+self.reset_status);
        if(self.reset_status)
        {
          this.$router.push("/workflow");
        }
      }
    },
    
  },
  mounted() {
    //console.log("IT WORKS");
  }
};
</script>

<style scoped>

 .form-body{
  padding-top:100px;
  width: 50%;
  display: inline-block;
}

.form-content{
  padding-top:50px;
  
  border-radius: 25px;
  border: 1px solid;
  
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